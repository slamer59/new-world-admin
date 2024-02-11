import * as z from "zod"
import * as imports from "../null"
import { CompletePlayer, relatedPlayerModel } from "./index"

export const userModel = z.object({
  id: z.number().int(),
  username: z.string(),
  email: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteUser extends z.infer<typeof userModel> {
  player?: CompletePlayer | null
}

/**
 * relatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => userModel.extend({
  player: relatedPlayerModel.nullish(),
}))
