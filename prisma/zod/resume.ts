import * as z from "zod"
import { CompleteSpeciality, RelatedSpecialityModel, CompleteLevel, RelatedLevelModel, CompleteResumeSkill, RelatedResumeSkillModel, CompleteUser, RelatedUserModel, CompleteFavoriteResume, RelatedFavoriteResumeModel } from "./index"

export const ResumeModel = z.object({
  id: z.string(),
  specialityId: z.string(),
  levelId: z.string(),
  details: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteResume extends z.infer<typeof ResumeModel> {
  speciality: CompleteSpeciality
  level: CompleteLevel
  resumeSkills: CompleteResumeSkill[]
  author: CompleteUser
  favoritedBy: CompleteFavoriteResume[]
}

/**
 * RelatedResumeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedResumeModel: z.ZodSchema<CompleteResume> = z.lazy(() => ResumeModel.extend({
  speciality: RelatedSpecialityModel,
  level: RelatedLevelModel,
  resumeSkills: RelatedResumeSkillModel.array(),
  author: RelatedUserModel,
  favoritedBy: RelatedFavoriteResumeModel.array(),
}))
