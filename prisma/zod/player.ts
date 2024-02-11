import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel, CompleteRole, RelatedRoleModel, CompleteStatus, RelatedStatusModel, CompleteWarComposition, RelatedWarCompositionModel } from "./index"

export const PlayerModel = z.object({
  id: z.number().int(),
  name: z.string(),
  userId: z.number().int(),
  statusId: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
  warCompositionId: z.number().int().nullish(),
})

export interface CompletePlayer extends z.infer<typeof PlayerModel> {
  user: CompleteUser
  roles: CompleteRole[]
  status: CompleteStatus
  warComposition?: CompleteWarComposition | null
}

/**
 * RelatedPlayerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPlayerModel: z.ZodSchema<CompletePlayer> = z.lazy(() => PlayerModel.extend({
  user: RelatedUserModel,
  roles: RelatedRoleModel.array(),
  status: RelatedStatusModel,
  warComposition: RelatedWarCompositionModel.nullish(),
}))
