//@ts-nocheck
import { Prisma } from "@prisma/client";
import prisma from "./prisma";

export async function getWarCompositions() {
    try {
        const data = await prisma.warComposition.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    position: true,
                    players: {
                        select: {
                            id: true,
                            name: true,
                            // roles
                            // status
                            // statusId
                            // created_at
                            // updated_at
                            // warComposition
                            // warCompositionId
                        }
                    }
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

// War statistics

export async function getWarCount() {
    try {
        const data = await prisma.war.count();
        return data;
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e);
        }
        throw e;
    }
}
export async function getWarStatisticsByWar({ warId = 1 }) {
    try {
        const data = await prisma.warStat.findMany({
            where: {
                war: {
                    id: warId
                }
            },
            include: {
                player: true,
                war: true
            },
        });

        return data
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e);
        }
        throw e;
    }
}

export async function getWarStatisticsByWarAndGroup({ warId = 1 }) {
    try {
        const data = await prisma.warStat.findMany({
            where: {
                war: {
                    id: warId
                },
                WarComposition: {
                    id: 1
                }
            },
            include: {
                player: true,
                war: true
            },
        });

        return data
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.error(e);
        }
        throw e;
    }
}