import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteResume, RelatedResumeModel, CompleteFavoriteResume, RelatedFavoriteResumeModel, CompleteFavoriteOrder, RelatedFavoriteOrderModel, CompleteOrder, RelatedOrderModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().nullish(),
  birthDate: z.date(),
  tel: z.string().nullish(),
  avatar: z.string().nullish(),
  role: z.nativeEnum(Role),
  tokenVersion: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  resume?: CompleteResume | null
  favoriteResumes: CompleteFavoriteResume[]
  favoriteOrders: CompleteFavoriteOrder[]
  postedOrders: CompleteOrder[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  resume: RelatedResumeModel.nullish(),
  favoriteResumes: RelatedFavoriteResumeModel.array(),
  favoriteOrders: RelatedFavoriteOrderModel.array(),
  postedOrders: RelatedOrderModel.array(),
}))
