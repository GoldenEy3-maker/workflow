import * as z from "zod"
import { CompleteResume, RelatedResumeModel } from "./index"

export const LevelModel = z.object({
  id: z.string(),
  value: z.string(),
})

export interface CompleteLevel extends z.infer<typeof LevelModel> {
  attackedBy: CompleteResume[]
}

/**
 * RelatedLevelModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLevelModel: z.ZodSchema<CompleteLevel> = z.lazy(() => LevelModel.extend({
  attackedBy: RelatedResumeModel.array(),
}))
