import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteResume, RelatedResumeModel } from "./index"

export const FavoriteResumeModel = z.object({
  id: z.string(),
  userId: z.string(),
  resumeId: z.string(),
  createdAt: z.date(),
})

export interface CompleteFavoriteResume extends z.infer<typeof FavoriteResumeModel> {
  user: CompleteUser
  resume: CompleteResume
}

/**
 * RelatedFavoriteResumeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFavoriteResumeModel: z.ZodSchema<CompleteFavoriteResume> = z.lazy(() => FavoriteResumeModel.extend({
  user: RelatedUserModel,
  resume: RelatedResumeModel,
}))
