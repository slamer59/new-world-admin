import * as z from "zod"

import { Level, RoleType } from "@prisma/client"
import { CompleteWarComposition, RelatedWarCompositionModel } from "./index"

export const PlayerTypeModel = z.object({
  id: z.number().int(),
  name: z.string(),
  roleType: z.nativeEnum(RoleType),
  level: z.nativeEnum(Level),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompletePlayerType extends z.infer<typeof PlayerTypeModel> {
  warComposition: CompleteWarComposition[]
}

/**
 * RelatedPlayerTypeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPlayerTypeModel: z.ZodSchema<CompletePlayerType> = z.lazy(() => PlayerTypeModel.extend({
  warComposition: RelatedWarCompositionModel.array(),
}))
