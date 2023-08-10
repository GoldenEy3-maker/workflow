import { Role } from "@prisma/client"
import bcrypt from "bcrypt"
import Cookies from "js-cookie"
import { z } from "zod"
import ApiError from "~/server/exeptions"
import dateService from "~/services/date.service"
import imageService from "~/services/image.service"
import mailService from "~/services/mail.service"
import tokenService from "~/services/token.service"
import { CookieKeys } from "~/utils/enums"
import { getBaseUrl } from "~/utils/helpers"
import {
  apiProcedure,
  authedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "../trpc"

export const userRouter = createTRPCRouter({
  getCurrent: authedProcedure.query((opts) => {
    return { ...opts.ctx.user }
  }),
  uploadAvatar: authedProcedure
    .input(
      z.object({
        base64: z.string(),
        fileName: z.string(),
      })
    )
    .mutation(async (opts) => {
      const uploadedPath = await imageService.uploadAvatar({
        base64: opts.input.base64,
        fileName: opts.input.fileName,
        userId: opts.ctx.user.id,
      })

      if (opts.ctx.user.avatar)
        await imageService.deleteAvatar(opts.ctx.user.avatar)

      const updatedUser = await opts.ctx.prisma.user.update({
        where: {
          id: opts.ctx.user.id,
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
    .mutation(async (opts) => {
      const { fullName, ...restInput } = opts.input

      const alreadyExistUser = await opts.ctx.prisma.user.findUnique({
        where: {
          email: opts.input.email,
        },
      })

      if (alreadyExistUser)
        throw ApiError.BadRequest("Такой пользователь уже существует!")

      const hashedPassword = await bcrypt.hash(opts.input.password, 10)

      const [lastName, firstName, middleName] = fullName.split(" ")

      const activateToken = tokenService.generateActivateToken({
        ...restInput,
        lastName,
        middleName,
        firstName,
        password: hashedPassword,
      })

      await mailService.sendLink(
        opts.input.email,
        `${getBaseUrl()}/activate?token=${activateToken}`
      )

      return activateToken
    }),
  signIn: apiProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const user = await opts.ctx.prisma.user.findUnique({
        where: {
          email: opts.input.email,
        },
      })

      if (!user) throw ApiError.BadRequest("Неверный логин или пароль!")

      const isPwdMatched = await bcrypt.compare(
        opts.input.password,
        user.password
      )

      if (!isPwdMatched) throw ApiError.BadRequest("Неверный логин или пароль!")

      const { accessToken, refreshToken } = tokenService.generateTokens(user)

      tokenService.sendRefreshToken(refreshToken, opts.ctx.req, opts.ctx.res)

      return accessToken
    }),
  signOut: publicProcedure.mutation(() => {
    Cookies.remove(CookieKeys.RefreshToken)
  }),
  activate: publicProcedure
    .input(z.string().nullable())
    .mutation(async (opts) => {
      const token = opts.input

      if (!token) throw ApiError.BadRequest("Отсутствует откен активации!")

      const activateTokenPayload = tokenService.verifyActivateToken(token)

      if (!activateTokenPayload)
        throw ApiError.BadRequest("Невалидный токен активации аккаунта!")

      const alreadyExistUser = await opts.ctx.prisma.user.findUnique({
        where: {
          email: activateTokenPayload.email,
        },
      })

      if (alreadyExistUser)
        throw ApiError.BadRequest("Такой пользователь уже активирован!")

      const newUser = await opts.ctx.prisma.user.create({
        data: {
          email: activateTokenPayload.email,
          firstName: activateTokenPayload.firstName,
          lastName: activateTokenPayload.lastName,
          password: activateTokenPayload.password,
          role: activateTokenPayload.role,
          birthDate: new Date(activateTokenPayload.birthDate),
        },
      })

      return { ...newUser }
    }),
})
