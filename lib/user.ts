import prisma from "./prisma";


export async function getUsers() {
    try {
        const data = await prisma.user.findMany();
        return data
    } catch (error) {
        return { error }
    }
}

export async function createUser(title: string) {
    try {
        const data = await prisma.user.create({ data: { title } })
        return data
    } catch (error) {
        return { error }
    }
}

export async function updateUser(id: number, formData: any) {
    try {
        const data = await prisma.user.update({
            where: { id },
            data: {
                username: formData.username,
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
                username: true,
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
//     const { username, password } = Object.fromEntries(formData);

//     try {
//         await signIn("credentials", { username, password });
//     } catch (err) {
//         if (err.message.includes("CredentialsSignin")) {
//             return "Wrong Credentials";
//         }
//         throw err;
//     }
// };