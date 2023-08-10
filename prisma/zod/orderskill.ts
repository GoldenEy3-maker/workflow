import * as z from "zod"
import { CompleteSkill, RelatedSkillModel, CompleteOrder, RelatedOrderModel } from "./index"

export const OrderSkillModel = z.object({
  id: z.string(),
  skillId: z.string(),
  orderId: z.string(),
})

export interface CompleteOrderSkill extends z.infer<typeof OrderSkillModel> {
  skill: CompleteSkill
  order: CompleteOrder
}

/**
 * RelatedOrderSkillModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderSkillModel: z.ZodSchema<CompleteOrderSkill> = z.lazy(() => OrderSkillModel.extend({
  skill: RelatedSkillModel,
  order: RelatedOrderModel,
}))
