import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed your database with initial data here
  try {
    // Example seed data for User model
    const user = await prisma.user.upsert({
      where: { id: "1" }, // Replace 1 with the existing user ID from the database
      update: {email: 'john1@example.com',},
      create: {
        name: 'John Doe',
        // email: 'john1@example.com',
        emailVerified: new Date(),
        image: 'https://example.com/profile.jpg',
        // Add more fields as needed
      },
    });

    // Example seed data for Account model
    await prisma.account.upsert({
      where: { userId: user.id, id: "1" }, // Replace 1 with the existing user ID from the database
      update: {},
      create: {
        userId: user.id, // Replace 1 with an existing user ID from the database
        type: 'type_1',
        provider: 'provider_1',
        providerAccountId: 'provider_account_id_1',
        // Add more fields as needed
      },
    });

    // Add more seed data for other models as needed
    // Example seed data for Player model
    const player = await prisma.player.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Player Name',
        level: 50, // Adjust level as needed
        role: 'Mage', // Adjust role as needed
        role1: 'Brume', // Adjust role1 as needed
        spec: 'Fire_Ice', // Adjust spec as needed
        poids: 'Medium', // Adjust poids as needed
        runeCoeur: 'Detonate', // Adjust runeCoeur as needed
        ticket: true,
        discord: false,
        gearCheck: false,
        pov: false,
        enPause: true,
        pasDeWar: false,
        merc: false,
        roasterId: 1, // Adjust roasterId as needed
      },
    });
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
