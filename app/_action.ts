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
  try {
    const response = await updateUser(id, formData)

    if (response.error) {
      throw new Error("Error updating user", response.error)
    }
    revalidatePath("/dashboard/user")
    // redirect("/dashboard/user")
  } catch (error) {
    throw new Error("Error updating user", error)
  }



}

export async function deleteUserAction(formData) {
  await deleteUserById(formData.id)
  revalidatePath("/dashboard/user")
  redirect("/dashboard/user")
}