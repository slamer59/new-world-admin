import * as z from "zod"


export const WarModel = z.object({
  id: z.number().int(),
  date: z.date(),
  created_at: z.date(),
  updated_at: z.date(),
})
