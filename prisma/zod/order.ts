import * as z from "zod"
import { OrderStatus } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteOrderSkill, RelatedOrderSkillModel, CompleteFavoriteOrder, RelatedFavoriteOrderModel } from "./index"

export const OrderModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number().int().nullish(),
  secure: z.boolean(),
  authorId: z.string(),
  status: z.nativeEnum(OrderStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteOrder extends z.infer<typeof OrderModel> {
  author: CompleteUser
  skills: CompleteOrderSkill[]
  favoritedBy: CompleteFavoriteOrder[]
}

/**
 * RelatedOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModel: z.ZodSchema<CompleteOrder> = z.lazy(() => OrderModel.extend({
  author: RelatedUserModel,
  skills: RelatedOrderSkillModel.array(),
  favoritedBy: RelatedFavoriteOrderModel.array(),
}))
