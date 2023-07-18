import { initTRPC } from "@trpc/server"
import { type CreateNextContextOptions } from "@trpc/server/adapters/next"
import superjson from "superjson"
import { ZodError } from "zod"
import { prisma } from "~/server/db"
import ApiError from "~/server/exeptions"
import tokenService from "~/services/token.service"

export const createTRPCContext = ({ req, res }: CreateNextContextOptions) => {
  return {
    prisma,
    req,
    res,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware

const isAuthed = middleware(async ({ next, ctx: { req, prisma } }) => {
  const accessToken = req.headers.authorization?.split(" ")[1]

  if (!accessToken) throw ApiError.Unauthorized()

  const accessTokenPayload = tokenService.verifyAccessToken(accessToken)

  if (!accessTokenPayload) throw ApiError.Unauthorized()

  const user = await prisma.user.findUnique({
    where: {
      email: accessTokenPayload.email,
    },
  })

  if (!user) throw ApiError.Unauthorized()

  return next({
    ctx: { user },
  })
})

export const authedProcedure = t.procedure.use(isAuthed)