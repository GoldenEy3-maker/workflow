import * as z from "zod"
import { CompleteOrder, RelatedOrderModel, CompleteUser, RelatedUserModel } from "./index"

export const FavoriteOrderModel = z.object({
  id: z.string(),
  orderId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
})

export interface CompleteFavoriteOrder extends z.infer<typeof FavoriteOrderModel> {
  order: CompleteOrder
  user: CompleteUser
}

/**
 * RelatedFavoriteOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFavoriteOrderModel: z.ZodSchema<CompleteFavoriteOrder> = z.lazy(() => FavoriteOrderModel.extend({
  order: RelatedOrderModel,
  user: RelatedUserModel,
}))
