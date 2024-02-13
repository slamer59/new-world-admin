// @ts-nocheck
import { Prisma } from "@prisma/client";

import prisma from "./prisma";

export async function getPlayers() {
    const data = await prisma.player.findMany(
        {
            select: {
                id: true,
                name: true,
            }
        }
    );
    return data;
}

export async function getPlayersDetails() {
    try {
        const data = await prisma.player.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    user: {
                        select: {
                            // id: true,
                            name: true,
                        }
                    },
                    roles: {
                        select: {
                            // id: true,
                            roleType: true,
                        }
                    },
                    status: true,
                    created_at: true,
                    updated_at: true,
                    warComposition: true,
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

export async function getPlayerById(id: number) {
    try {
        const data = await prisma.player.findUnique(
            { where: { id } }
        )
        return data;
    } catch (e) {
        console.error(e);
    }


}

export async function createPlayer(id: number, data) {
    try {
        const response = await prisma.player.create({
            data: {
                id,
                ...data
            }
        })
        return response;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            throw new Error("Error creating player", e)
        }
        throw e
    }
}

export async function updatePlayer(id: number, data) {
    try {
        const response = await prisma.player.update(
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


