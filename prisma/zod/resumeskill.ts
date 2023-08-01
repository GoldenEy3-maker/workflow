import * as z from "zod"
import { CompleteResume, RelatedResumeModel, CompleteSkill, RelatedSkillModel } from "./index"

export const ResumeSkillModel = z.object({
  id: z.string(),
  resumeId: z.string(),
  skillId: z.string(),
})

export interface CompleteResumeSkill extends z.infer<typeof ResumeSkillModel> {
  resume: CompleteResume
  skill: CompleteSkill
}

/**
 * RelatedResumeSkillModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedResumeSkillModel: z.ZodSchema<CompleteResumeSkill> = z.lazy(() => ResumeSkillModel.extend({
  resume: RelatedResumeModel,
  skill: RelatedSkillModel,
}))
