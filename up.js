import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateUserPlayerAssociation(userId, playerId) {
  try {
    // Find the user with id = userId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { player: true }, // Include the player relation
    });

    if (!user) {
      console.error(`User with id ${userId} not found.`);
      return;
    }

    // Find the player with id = playerId
    const player = await prisma.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      console.error(`Player with id ${playerId} not found.`);
      return;
    }

    // Update the player association for the user
    await prisma.user.update({
      where: { id: userId },
      data: {
        player: { connect: { id: playerId } }, // Connect to the new player
      },
    });

    console.log(`User with id ${userId} is now connected to player with id ${playerId}.`);
  } catch (error) {
    console.error('Error updating user-player association:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}

// Usage:
updateUserPlayerAssociation(1, 4);
