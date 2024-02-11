import * as z from "zod"
import * as imports from "../null"
import { CompletePlayer, relatedPlayerModel } from "./index"

export const statusModel = z.object({
  id: z.number().int(),
  ticket: z.boolean(),
  discord: z.boolean(),
  gear_check: z.boolean(),
  pov: z.boolean(),
  status_ticket: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteStatus extends z.infer<typeof statusModel> {
  player: CompletePlayer[]
}

/**
 * relatedStatusModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedStatusModel: z.ZodSchema<CompleteStatus> = z.lazy(() => statusModel.extend({
  player: relatedPlayerModel.array(),
}))
