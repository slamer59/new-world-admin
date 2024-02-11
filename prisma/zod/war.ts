import * as z from "zod"
import * as imports from "../null"

export const WarModel = z.object({
  id: z.number().int(),
  date: z.date(),
  created_at: z.date(),
  updated_at: z.date(),
})
