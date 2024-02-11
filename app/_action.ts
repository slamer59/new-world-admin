'use server'

import { updatePlayer } from "@/lib/player"
import { deleteUserById, updateUser } from "@/lib/user"
import { Prisma } from "@prisma/client"
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
    redirect("/dashboard/user")
  } catch (error) {
    throw new Error("Error updating user", error)
  }



}

export async function deleteUserAction(formData) {
  await deleteUserById(formData.id)
  revalidatePath("/dashboard/user")
  redirect("/dashboard/user")
}

export async function updatePlayerAction(id: int, formData) {
  try {
    await updatePlayer(id, formData)
    revalidatePath("/dashboard/player")
    redirect("/dashboard/player")
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        )
      }
    }
    throw e
  }
}
