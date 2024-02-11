import * as z from "zod"
import * as imports from "../null"
import { RoleType, Level } from "@prisma/client"
import { CompleteWarComposition, relatedWarCompositionModel } from "./index"

export const playerTypeModel = z.object({
  id: z.number().int(),
  name: z.string(),
  role: z.nativeEnum(RoleType),
  level: z.nativeEnum(Level),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompletePlayerType extends z.infer<typeof playerTypeModel> {
  warComposition: CompleteWarComposition[]
}

/**
 * relatedPlayerTypeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPlayerTypeModel: z.ZodSchema<CompletePlayerType> = z.lazy(() => playerTypeModel.extend({
  warComposition: relatedWarCompositionModel.array(),
}))
