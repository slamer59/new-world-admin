'use server'

import { deleteUserById, updateUser } from "@/lib/user"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


// export async function createUserAction(formData) {
//   await createUser(title)
//   revalidatePath("/dashboard/user")
//   redirect("/dashboard/user")
// }

export async function updateUserAction(id: int, formData) {
  const log = await updateUser(id, formData)
  revalidatePath("/dashboard/user")
  // redirect("/dashboard/user")
}

export async function deleteUserAction(formData) {
  await deleteUserById(formData.id)
  revalidatePath("/dashboard/user")
  redirect("/dashboard/user")
}