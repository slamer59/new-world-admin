import { faker } from '@faker-js/faker/locale/af_ZA';

// Import the generated Prisma client
import { PrismaClient } from '@prisma/client';
// Instantiate Prisma client
const prisma = new PrismaClient();

// Create a new role
async function createRole() {
  try {
    const newRole = await prisma.role.create({
      data: {
        id: 200,  
        name: faker.person.firstName(),
        roleType: 'Bruiser', // Replace 'Bruiser' with the desired role type
        rune: "BileBomb",
        weapon: "Bow",
        weightLimit: "Heavy" ,
        // Assign values for other fields as needed
      },
    });
    console.log('Created role:', newRole);
  } catch (error) {
    console.error('Error creating role:', error);
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}

// Call the function to create a new role
createRole();
