import { SkillModel } from "prisma/zod"
import { z } from "zod"
import ApiError from "~/server/exeptions"
import { authedProcedure, createTRPCRouter, publicProcedure } from "../trpc"

export const orderRouter = createTRPCRouter({
  getByUserId: authedProcedure
    .input(
      z.object({ id: z.string(), archived: z.boolean().optional() }).optional()
    )
    .query(async (opts) => {
      const orders = await opts.ctx.prisma.order.findMany({
        where: {
          authorId: opts.ctx.user.id,
          status: opts.input?.archived
            ? {
                equals: "ARCHIVED",
              }
            : {
                not: "ARCHIVED",
              },
        },
        orderBy: { updatedAt: "desc" },
      })

      return orders
    }),
  getAll: publicProcedure.query(async (opts) => {
    const orders = await opts.ctx.prisma.order.findMany({
      where: {
        status: {
          not: "ARCHIVED",
        },
      },
      include: {
        skills: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return orders
  }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const order = await opts.ctx.prisma.order.findUnique({
        where: {
          id: opts.input.id,
        },
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
        },
      })

      return order
    }),
  archive: authedProcedure
    .input(z.object({ id: z.string().optional() }))
    .mutation(async (opts) => {
      if (!opts.input.id)
        throw ApiError.BadRequest("Отсутсвует параметр - 'id'!")

      const archivedOrder = await opts.ctx.prisma.order.update({
        where: {
          id: opts.input.id,
        },
        data: {
          status: "ARCHIVED",
        },
      })

      return archivedOrder
    }),
  create: authedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        price: z.number().optional(),
        skills: z.array(SkillModel),
      })
    )
    .mutation(async (opts) => {
      const newOrder = await opts.ctx.prisma.order.create({
        data: {
          title: opts.input.title,
          description: opts.input.description,
          secure: true,
          authorId: opts.ctx.user.id,
          price: opts.input.price,
          skills: {
            createMany: {
              data: opts.input.skills.map((skill) => ({
                skillId: skill.id,
              })),
            },
          },
        },
      })

      return newOrder
    }),
  update: authedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        price: z.number().optional(),
        skills: z.array(SkillModel),
      })
    )
    .mutation(async (opts) => {
      const updatedOrder = await opts.ctx.prisma.order.update({
        where: {
          id: opts.input.id,
        },
        data: {
          title: opts.input.title,
          description: opts.input.description,
          price: opts.input.price,
        },
      })

      await opts.ctx.prisma.orderSkill.deleteMany({
        where: {
          orderId: opts.input.id,
        },
      })

      await opts.ctx.prisma.orderSkill.createMany({
        data: opts.input.skills.map((skill) => ({
          orderId: updatedOrder.id,
          skillId: skill.id,
        })),
      })

      return updatedOrder
    }),
})
