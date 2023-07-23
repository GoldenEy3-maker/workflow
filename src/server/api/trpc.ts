import { initTRPC, type inferAsyncReturnType } from "@trpc/server"
import { type CreateNextContextOptions } from "@trpc/server/adapters/next"
import superjson from "superjson"
import { ZodError } from "zod"
import { prisma } from "~/server/db"
import ApiError from "~/server/exeptions"
import tokenService from "~/services/token.service"

export const createTRPCContextInner = () => {
  return {
    prisma,
  }
}

export const createTRPCContext = (opts: Partial<CreateNextContextOptions>) => {
  const contextInner = createTRPCContextInner()

  return {
    ...contextInner,
    req: opts.req,
    res: opts.res,
  }
}

export type Context = inferAsyncReturnType<typeof createTRPCContext>

const t = initTRPC.context<Context>().create({
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

const isApi = middleware((opts) => {
  if (!opts.ctx.req || !opts.ctx.res)
    throw ApiError.ServerError("Отсутствуют части api процедуры!")

  return opts.next({
    ctx: {
      req: opts.ctx.req,
      res: opts.ctx.res,
    },
  })
})

const isAuthed = middleware(async (opts) => {
  const accessToken = opts.ctx.req?.headers.authorization?.split(" ")[1]

  if (!accessToken) throw ApiError.Unauthorized()

  const accessTokenPayload = tokenService.verifyAccessToken(accessToken)

  if (!accessTokenPayload) throw ApiError.Unauthorized()

  const user = await prisma.user.findUnique({
    where: {
      email: accessTokenPayload.email,
    },
  })

  if (!user) throw ApiError.Unauthorized()

  return opts.next({
    ctx: { user },
  })
})

export const apiProcedure = t.procedure.use(isApi)
export const authedProcedure = t.procedure.use(isAuthed)
