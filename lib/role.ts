import { Prisma } from "@prisma/client";
import prisma from "./prisma";

export async function getRoles() {
    try {
        const data = await prisma.role.findMany(
            {
                select: {
                    id: true,
                    name: true,
                }
            }
        );
        return data;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e);
        }
        throw e;
    }
}

export async function getRolesDetails() {
    try {
        const data = await prisma.role.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    roleType: true,
                    rune: true,
                    weapon: true,
                    weightLimit: true,
                    player: true,
                    created_at: true,
                    updated_at: true,
                }
            }
        );
        return data;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e);
        }
        throw e;
    }
}

export async function getRoleById(id: number) {
    try {
        const data = await prisma.role.findUnique(
            { where: { id } }
        )
        return data;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e);
        }
        throw e;
    }
}

export async function createRole(id: number, data) {
    try {
        const response = await prisma.role.create({
            data: {
                id,
                ...data
            }
        })
        return response;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            throw new Error("Error creating role", e)
        }
        throw e
    }
}

export async function updateRole(id: number, data) {
    try {
        const response = await prisma.role.update(
            {
                where: { id },
                data
            }
        )
        return response;
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