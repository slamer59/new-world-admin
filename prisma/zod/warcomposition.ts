import * as z from "zod"
import * as imports from "../null"
import { WarPosition } from "@prisma/client"
import { CompletePlayer, relatedPlayerModel, CompletePlayerType, relatedPlayerTypeModel } from "./index"

export const warCompositionModel = z.object({
  id: z.number().int(),
  name: z.string(),
  position: z.nativeEnum(WarPosition),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteWarComposition extends z.infer<typeof warCompositionModel> {
  slot: CompletePlayer[]
  playerType: CompletePlayerType[]
}

/**
 * relatedWarCompositionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedWarCompositionModel: z.ZodSchema<CompleteWarComposition> = z.lazy(() => warCompositionModel.extend({
  slot: relatedPlayerModel.array(),
  playerType: relatedPlayerTypeModel.array(),
}))
