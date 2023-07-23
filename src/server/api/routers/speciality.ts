import { createTRPCRouter, publicProcedure } from "../trpc"

export const specialityRouter = createTRPCRouter({
  getAll: publicProcedure.query(async (opts) => {
    const specialities = await opts.ctx.prisma.speciality.findMany()

    return specialities
  }),
})
