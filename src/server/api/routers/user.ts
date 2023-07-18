import { Role } from "@prisma/client"
import bcrypt from "bcrypt"
import Cookies from "js-cookie"
import { z } from "zod"
import ApiError from "~/server/exeptions"
import imageService from "~/services/image.service"
import mailService from "~/services/mail.service"
import tokenService from "~/services/token.service"
import { CookieKeys } from "~/utils/enums"
import { getDevUrl, getProdUrl } from "~/utils/helpers"
import { authedProcedure, createTRPCRouter, publicProcedure } from "../trpc"

export const userRouter = createTRPCRouter({
  getCurrent: authedProcedure.query(({ ctx: { user } }) => {
    return { ...user }
  }),
  uploadAvatar: authedProcedure
    .input(
      z.object({
        base64: z.string(),
        fileName: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { user, prisma } }) => {
      const uploadedPath = await imageService.uploadAvatar({
        base64: input.base64,
        fileName: input.fileName,
        userId: user.id,
      })

      if (user.avatar) await imageService.deleteAvatar(user.avatar)

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          avatar: uploadedPath.path,
        },
      })

      return updatedUser
    }),
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        fullName: z.string(),
        birthDate: z.string(),
        role: z.nativeEnum(Role),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const { fullName, ...restInput } = input

      await prisma.user.deleteMany()

      const alreadyExistUser = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })

      if (alreadyExistUser)
        throw ApiError.BadRequest("Такой пользователь уже существует!")

      const hashedPassword = await bcrypt.hash(input.password, 10)

      const [lastName, firstName, middleName] = fullName.split(" ")

      if (!lastName || !firstName || middleName === undefined)
        throw ApiError.BadRequest("Некорректное полное имя!")

      const activateToken = tokenService.generateActivateToken({
        ...restInput,
        lastName,
        middleName,
        firstName,
        password: hashedPassword,
      })

      await mailService.sendLink(
        input.email,
        `${getProdUrl() ?? getDevUrl()}/activate?token=${activateToken}`
      )

      return activateToken
    }),
  signIn: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma, req, res } }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })

      if (!user) throw ApiError.BadRequest("Неверный логин или пароль!")

      const isPwdMatched = await bcrypt.compare(input.password, user.password)

      if (!isPwdMatched) throw ApiError.BadRequest("Неверный логин или пароль!")

      const { accessToken, refreshToken } = tokenService.generateTokens(user)

      tokenService.sendRefreshToken(refreshToken, req, res)

      return accessToken
    }),
  signOut: publicProcedure.mutation(() => {
    Cookies.remove(CookieKeys.RefreshToken)
  }),
  activate: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx: { prisma } }) => {
      const activateTokenPayload = tokenService.verifyActivateToken(input)

      if (!activateTokenPayload)
        throw ApiError.BadRequest("Невалидный токен активации аккаунта!")

      const alreadyExistUser = await prisma.user.findUnique({
        where: {
          email: activateTokenPayload.email,
        },
      })

      if (alreadyExistUser)
        throw ApiError.BadRequest("Такой пользователь уже активирован!")

      const newUser = await prisma.user.create({
        data: activateTokenPayload
      })

      return { ...newUser }
    }),
})