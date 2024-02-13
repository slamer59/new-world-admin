import * as z from "zod"

import { CompletePlayer, RelatedPlayerModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  player?: CompletePlayer | null
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  player: RelatedPlayerModel.nullish(),
}))
