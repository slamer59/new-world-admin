//@ts-nocheck
import { Prisma } from "@prisma/client";
import prisma from "./prisma";


export async function getUsers() {
    try {
        const data = await prisma.user.findMany();
        return data
    } catch (error) {
        return { error }
    }
}

export async function createUser(id: number, data) {
    try {
        const response = await prisma.user.create({
            data: {
                id,
                ...data
            }
        })
        return response;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            throw new Error("Error creating user", e)
        }
        throw e
    }
}

export async function updateUser(id: number, formData: any) {
    try {
        const data = await prisma.user.update({
            where: { id },
            data: {
                name: formData.name,
                email: formData.email,
                player: {
                    connect: {
                        id: formData.player
                    }
                },
            }
        })

        return data
    } catch (error) {
        return { error }
    }
}

export async function deleteUserById(id: number) {
    try {
        const data = await prisma.user.delete({ where: { id } })
        return data
    } catch (error) {
        return { error }
    }
}

export async function getUserById(id: number) {
    try {
        const data = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                player: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                // createdAt: false,
                // updatedAt: false
            }
        })
        return data
    } catch (error) {
        return { error }
    }
}

// export const authenticate = async (prevState, formData) => {
//     const { name, password } = Object.fromEntries(formData);

//     try {
//         await signIn("credentials", { name, password });
//     } catch (err) {
//         if (err.message.includes("CredentialsSignin")) {
//             return "Wrong Credentials";
//         }
//         throw err;
//     }
// };