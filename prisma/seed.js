import { faker } from "@faker-js/faker";
import {
  Level,
  PrismaClient,
  RoleType,
  Rune,
  WarPosition,
  Weapon,
  WeightLimit,
} from "@prisma/client";

const prisma = new PrismaClient();
const numberOfPlayer = 20;
const numberOfPlayerType = 15
const numberOfWarComposition = 10


async function seed() {
  try {
    // Seed assign to player
    const levelList = [
      Level.rookie,
      Level.intermediate,
      Level.experienced,
      Level.veteran,
    ];
    const roleList = [
      RoleType.Bruiser,
      RoleType.Disrupter,
      RoleType.Heal,
      RoleType.Mage,
      RoleType.Ranged,
      RoleType.Support,
      RoleType.Tank,
      RoleType.zzz_lvling,
    ];
    const weightList = [
      WeightLimit.Light,
      WeightLimit.Medium,
      WeightLimit.Heavy,
    ];
    
    const runeList = [
      Rune.Detonate,
      Rune.Stoneform,
      Rune.FireStorm,
      Rune.GraspingVines,
      Rune.BileBomb,
      Rune.CanonBlast,
      Rune.DarkAscent,
      Rune.PrimalFury,
      Rune.TheDevourer,
    ];
    
    const weaponList = [
      Weapon.Bow,
      Weapon.FireStaff,
      Weapon.GreatAxe,
      Weapon.GreatSword,
      Weapon.Blunderbuss,
      Weapon.Hatchet,
      Weapon.IceGauntlet,
      Weapon.LifeStaff,
      Weapon.Musket,
      Weapon.Rapier,
      Weapon.Spear,
      Weapon.Swords,
      Weapon.WarHammer,
      Weapon.VoidGauntlet,
    ];

    const positionList = [
      WarPosition.top_left, WarPosition.top_right, WarPosition.bottom_left, WarPosition.bottom_right,
      WarPosition.point, WarPosition.flank, WarPosition.flex
    ]

    // Seed additional users
    for (let i = 0; i < numberOfPlayer; i++) {
      const user = await prisma.user.upsert({
        where: { id: i },
        update: {},
        create: {
          id: i,
          username: faker.internet.userName(),
          email: faker.internet.email(),
        },
      });

      // Defined Roles
      const role = await prisma.role.upsert({
        where: { id: i },
        update: {},
        create: {
          id: i,
          role: faker.helpers.arrayElement(roleList),
          rune: faker.helpers.arrayElement(runeList),
          weapon: faker.helpers.arrayElement(weaponList),
          weightLimit: faker.helpers.arrayElement(weightList),
        },
      });

      // Seed the Player table
      await prisma.player.upsert({
        where: { id: i },
        update: {},
        create: {
          name: faker.person.firstName(),
          user: {
            connect: { id: user.id },
          },
          roles: {
            connect: { id: role.id },
          },
          status: {
            create: {
              ticket: faker.helpers.arrayElement([true, false]),
              discord: faker.helpers.arrayElement([true, false]),
              gear_check: faker.helpers.arrayElement([true, false]),
              pov: faker.helpers.arrayElement([true, false]),
              status_ticket: faker.lorem.sentence(3),
            },
          },
        },
      });
    }

    
    function generatePlayers(roleList, levelList, count) {
      const players = [];
      for (let i = 0; i < count; i++) {
        players.push({
          name: faker.person.firstName(),
          role: faker.helpers.arrayElement(roleList),
          level: faker.helpers.arrayElement(levelList),
        });
      }
      return players;
    }
    // Create group war Composition
    for (let i = 0; i < numberOfWarComposition; i++) {
    await prisma.warComposition.create({
      data: {
        // name: faker.helpers.fromRegExp('Group #[1-10]'),
        name: `Group # ${i}`,
        position: faker.helpers.arrayElement(positionList),
        playerType: {
          create: generatePlayers(roleList, levelList, numberOfPlayerType),
        },
      },
    })
  }
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
