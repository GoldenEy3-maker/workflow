import { z } from "zod"
import { authedProcedure, createTRPCRouter } from "../trpc"

export const levelRouter = createTRPCRouter({
  getAll: authedProcedure
    .input(
      z
        .object({
          filterValue: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      const levels = await ctx.prisma.level.findMany({
        where: {
          value: {
            contains: input?.filterValue ?? "",
            mode: "insensitive",
          },
        },
      })

      return levels
    }),
})
