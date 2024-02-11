import * as z from "zod"
import * as imports from "../null"
import { RoleType, Rune, Weapon, WeightLimit } from "@prisma/client"
import { CompletePlayer, RelatedPlayerModel } from "./index"

export const RoleModel = z.object({
  id: z.number().int(),
  name: z.string(),
  role: z.nativeEnum(RoleType),
  rune: z.nativeEnum(Rune),
  weapon: z.nativeEnum(Weapon),
  weightLimit: z.nativeEnum(WeightLimit),
  playerId: z.number().int().nullish(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteRole extends z.infer<typeof RoleModel> {
  player?: CompletePlayer | null
}

/**
 * RelatedRoleModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRoleModel: z.ZodSchema<CompleteRole> = z.lazy(() => RoleModel.extend({
  player: RelatedPlayerModel.nullish(),
}))
