import * as z from "zod"
import { CompleteResume, RelatedResumeModel } from "./index"

export const SpecialityModel = z.object({
  id: z.string(),
  value: z.string(),
})

export interface CompleteSpeciality extends z.infer<typeof SpecialityModel> {
  attackedBy: CompleteResume[]
}

/**
 * RelatedSpecialityModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSpecialityModel: z.ZodSchema<CompleteSpeciality> = z.lazy(() => SpecialityModel.extend({
  attackedBy: RelatedResumeModel.array(),
}))
