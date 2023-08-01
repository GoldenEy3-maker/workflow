import * as z from "zod"
import { CompleteResumeSkill, RelatedResumeSkillModel } from "./index"

export const SkillModel = z.object({
  id: z.string(),
  value: z.string(),
})

export interface CompleteSkill extends z.infer<typeof SkillModel> {
  attackedBy: CompleteResumeSkill[]
}

/**
 * RelatedSkillModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSkillModel: z.ZodSchema<CompleteSkill> = z.lazy(() => SkillModel.extend({
  attackedBy: RelatedResumeSkillModel.array(),
}))
