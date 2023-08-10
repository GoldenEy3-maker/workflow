import { z } from "zod"
import { authedProcedure, createTRPCRouter } from "../trpc"

const orderRouter = createTRPCRouter({
  getById: authedProcedure
    .input(z.object({ id: z.string() }).optional())
    .query(async (opts) => {
      const orders = await opts.ctx.prisma.order.findMany({
        where: {},
      })
    }),
})
