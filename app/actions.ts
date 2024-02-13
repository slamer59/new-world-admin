'use server'

import { createPlayer, updatePlayer } from "@/lib/player"
import { createRole, updateRole } from "@/lib/role"
import { createUser, deleteUserById, updateUser } from "@/lib/user"
import { Prisma } from "@prisma/client"
import { redirect } from "next/navigation"


export async function createUserAction(id, formData) {
  try {
    await createUser(id, formData)
    // revalidatePath("/dashboard/user")
    redirect("/dashboard/user")
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Error creating user", e)
    }
  }
}

export async function updateUserAction(id: int, formData) {
  try {
    const response = await updateUser(id, formData)

    if (response.error) {
      throw new Error("Error updating user", response.error)
    }
    // revalidatePath("/dashboard/user")
    redirect("/dashboard/user")
  } catch (error) {
    throw new Error("Error updating user", error)
  }
}

export async function deleteUserAction(formData) {
  await deleteUserById(formData.id)
  // revalidatePath("/dashboard/user")
  redirect("/dashboard/user")
}

export async function createPlayerAction(id, formData) {
  try {
    await createPlayer(id, formData)
    // revalidatePath("/dashboard/player")
    console.log("🚀 ~ updatePlayerAction ~ id, formData", id, formData)

    redirect("/dashboard/player")

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Error creating player", e)
    }
  }
}

export async function updatePlayerAction(
  id: int,
  formData,
  redirectPath = "/dashboard/player",
  revalidateThisPath = "/dashboard/player"
) {
  try {
    await updatePlayer(id, formData)
    // revalidatePath(revalidateThisPath)
    // redirect(redirectPath)
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


// Role
export async function createRoleAction(id, formData) {
  try {
    const response = await createRole(id, formData)
    // revalidatePath("/dashboard/role")
    redirect("/dashboard/role")
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Error creating role", e)
    }
  }
}

export async function updateRoleAction(id: int, formData) {

  try {
    await updateRole(id, formData)
    // revalidatePath("/dashboard/role")
    redirect("/dashboard/role")
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error("Error updating role", e)
    }
  }
}