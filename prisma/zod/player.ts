import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, relatedUserModel, CompleteRole, relatedRoleModel, CompleteStatus, relatedStatusModel, CompleteWarComposition, relatedWarCompositionModel } from "./index"

export const playerModel = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.number().int(),
  statusId: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
  warCompositionId: z.number().int().nullish(),
})

export interface CompletePlayer extends z.infer<typeof playerModel> {
  user: CompleteUser
  roles: CompleteRole[]
  status: CompleteStatus
  warComposition?: CompleteWarComposition | null
}

/**
 * relatedPlayerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPlayerModel: z.ZodSchema<CompletePlayer> = z.lazy(() => playerModel.extend({
  user: relatedUserModel,
  roles: relatedRoleModel.array(),
  status: relatedStatusModel,
  warComposition: relatedWarCompositionModel.nullish(),
}))
