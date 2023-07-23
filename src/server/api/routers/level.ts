import { createTRPCRouter, publicProcedure } from "../trpc"

export const levelRouter = createTRPCRouter({
  getAll: publicProcedure.query(async (opts) => {
    const levels = await opts.ctx.prisma.level.findMany()

    return levels
  }),
})
