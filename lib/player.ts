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