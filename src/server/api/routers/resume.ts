import { LevelModel, SkillModel, SpecialityModel } from "prisma/zod"
import { z } from "zod"
import { authedProcedure, createTRPCRouter } from "../trpc"

export const resumeRouter = createTRPCRouter({
  create: authedProcedure
    .input(
      z.object({
        speciality: SpecialityModel,
        level: LevelModel,
        bio: z.string(),
        skills: z.array(SkillModel),
      })
    )
    .mutation(async (opts) => {
      const newResume = await opts.ctx.prisma.resume.create({
        data: {
          authorId: opts.ctx.user.id,
          specialityId: opts.input.speciality.id,
          levelId: opts.input.level.id,
          details: opts.input.bio,
          resumeSkills: {
            createMany: {
              data: opts.input.skills.map((skill) => ({
                skillId: skill.id,
              })),
            },
          },
        },
      })

      return newResume
    }),
  getByUserId: authedProcedure
    .input(z.object({ id: z.string() }).optional())
    .query(async (opts) => {
      const resume = await opts.ctx.prisma.resume.findUnique({
        where: {
          authorId: opts.input?.id ?? opts.ctx.user.id,
        },
        include: {
          level: true,
          resumeSkills: {
            include: {
              skill: true,
            },
          },
          speciality: true,
        },
      })

      return resume
    }),
  delete: authedProcedure.mutation(async (opts) => {
    const deletedResume = await opts.ctx.prisma.resume.delete({
      where: {
        authorId: opts.ctx.user.id,
      },
    })

    return deletedResume
  }),
  update: authedProcedure
    .input(
      z.object({
        speciality: SpecialityModel,
        level: LevelModel,
        bio: z.string(),
        skills: z.array(SkillModel),
      })
    )
    .mutation(async (opts) => {
      const updatedResume = await opts.ctx.prisma.resume.update({
        where: {
          authorId: opts.ctx.user.id,
        },
        data: {
          specialityId: opts.input.speciality.id,
          levelId: opts.input.level.id,
          details: opts.input.bio,
        },
      })

      await opts.ctx.prisma.resumeSkill.deleteMany({
        where: {
          resumeId: updatedResume.id,
        },
      })

      await opts.ctx.prisma.resumeSkill.createMany({
        data: opts.input.skills.map((skill) => ({
          resumeId: updatedResume.id,
          skillId: skill.id,
        })),
      })

      return updatedResume
    }),
})
