import * as z from "zod"
import * as imports from "../null"
import { CompletePlayer, RelatedPlayerModel } from "./index"

export const StatusModel = z.object({
  id: z.number().int(),
  ticket: z.boolean(),
  discord: z.boolean(),
  gear_check: z.boolean(),
  pov: z.boolean(),
  status_ticket: z.string().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteStatus extends z.infer<typeof StatusModel> {
  player: CompletePlayer[]
}

/**
 * RelatedStatusModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStatusModel: z.ZodSchema<CompleteStatus> = z.lazy(() => StatusModel.extend({
  player: RelatedPlayerModel.array(),
}))
