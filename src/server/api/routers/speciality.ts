import { z } from "zod"
import { authedProcedure, createTRPCRouter } from "../trpc"

export const specialityRouter = createTRPCRouter({
  getAll: authedProcedure
    .input(
      z.object({
        filterValue: z.string().optional(),
      }).optional()
    )
    .query(async ({ input, ctx }) => {
      const specialities = await ctx.prisma.speciality.findMany({
        where: {
          value: {
            contains: input?.filterValue ?? "",
            mode: "insensitive"
          },
        },
      })

      return specialities
    }),
})
