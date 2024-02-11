import prisma from "./prisma";


export async function getRoles() {
    try {
        const data = await prisma.role.findMany();
        return data
    } catch (error) {
        return { error }
    }
}

export async function createRole(title: string) {
    try {
        const data = await prisma.role.create({ data: { title } })
        return data
    } catch (error) {
        return { error }
    }
}

export async function updateRole(id: number, formData: any) {
    try {
        const data = await prisma.role.update({
            where: { id },
            data: {
                rolename: formData.rolename,
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

export async function deleteRoleById(id: number) {
    try {
        const data = await prisma.role.delete({ where: { id } })
        return data
    } catch (error) {
        return { error }
    }
}

export async function getRoleById(id: number) {
    try {
        const data = await prisma.role.findUnique({
            where: { id },
            select: {
                id: true,
                rolename: true,
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
//     const { rolename, password } = Object.fromEntries(formData);

//     try {
//         await signIn("credentials", { rolename, password });
//     } catch (err) {
//         if (err.message.includes("CredentialsSignin")) {
//             return "Wrong Credentials";
//         }
//         throw err;
//     }
// };