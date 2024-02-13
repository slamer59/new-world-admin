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
                    slot: {
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