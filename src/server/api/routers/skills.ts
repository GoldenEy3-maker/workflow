import { createTRPCRouter, publicProcedure } from "../trpc"

export const skillRouter = createTRPCRouter({
  getAll: publicProcedure.query(async (opts) => {
    const skills = await opts.ctx.prisma.skill.findMany()

    return skills
  }),
})
