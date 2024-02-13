import * as z from "zod"

import { WarPosition } from "@prisma/client"
import { CompletePlayer, CompletePlayerType, RelatedPlayerModel, RelatedPlayerTypeModel } from "./index"

export const WarCompositionModel = z.object({
  id: z.number().int(),
  name: z.string(),
  position: z.nativeEnum(WarPosition),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteWarComposition extends z.infer<typeof WarCompositionModel> {
  slot: CompletePlayer[]
  playerType: CompletePlayerType[]
}

/**
 * RelatedWarCompositionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWarCompositionModel: z.ZodSchema<CompleteWarComposition> = z.lazy(() => WarCompositionModel.extend({
  slot: RelatedPlayerModel.array(),
  playerType: RelatedPlayerTypeModel.array(),
}))
