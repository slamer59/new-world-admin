import { faker } from "@faker-js/faker";
import {
  Faction,
  Level,
  PrismaClient,
  Role,
  Rune_Coeur,
  Spec,
  Weight,
} from "@prisma/client";

const prisma = new PrismaClient();

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seed() {
  try {
    // Seed assign to player
    const levelList = [
      Level.rookie,
      Level.intermediate,
      Level.experienced,
      Level.veteran
    ]
    const factionList = [
      Faction.Covenant,
      Faction.Marauders,
      Faction.Syndicate,
    ];
    const roleList = [
      Role.Bruiser,
      Role.Disrupter,
      Role.Heal,
      Role.Mage,
      Role.Ranged,
      Role.Support,
      Role.Tank,
      Role.zzz_lvling,
    ];
    const weightList = [Weight.Heavy, Weight.Light, Weight.Medium];
    const rune_coeurList = [
      Rune_Coeur.Detonate,
      Rune_Coeur.Fire_Storm,
      Rune_Coeur.Grasping_Vines,
      Rune_Coeur.Stoneform,
    ];
    const specList = [
      Spec.GA_WH,
      Spec.SnS_GS,
      Spec.GS_HA,
      Spec.GS_Spear,
      Spec.SnS_Spear,
      Spec.Spear_HA,
      Spec.GA_BB,
      Spec.Healer_DST,
      Spec.Healer_Clap,
    ];

    // Seed additional users
    for (let i = 0; i < 10; i++) {
      await prisma.user.upsert({
        where: { id: i },
        update: {},
        create: {
          id: i,
          username: faker.internet.userName(),
          email: faker.internet.email(),
        },
      });

      await prisma.player.upsert({
        where: { id: i },
        update: {},
        create: {
          user_id: i,
          character_name: faker.person.firstName(),
          faction: getRandomFromArray(factionList),
          roles: [getRandomFromArray(roleList)],
          weight: getRandomFromArray(weightList),
          rune_coeur: getRandomFromArray(rune_coeurList),
          spec: getRandomFromArray(specList),
          status: {
            create: {
              ticket: getRandomFromArray([true, false]),
              discord: getRandomFromArray([true, false]),
              gear_check: getRandomFromArray([true, false]),
              pov: getRandomFromArray([true, false]),
              status_ticket: getRandomFromArray(["ok", "nok"]),
            },
          },
          level: getRandomFromArray(levelList),
        },
      });
    }

    // Seed the Player table
    // await prisma.player.upsert({
    //   where: { id: 1 },
    //   update: {},
    //   create: {
    //     id: 1,
    //     user_id: 1,
    //     character_name: faker.name.findName(),
    //     level: faker.datatype.number(),
    //     faction: faker.random.arrayElement(['Marauders', 'Syndicate', 'Covenant']) as Faction,
    //     role: [faker.random.arrayElement(['Bruiser', 'Disrupter', 'Heal', 'Mage', 'Ranged', 'Support', 'Tank', 'zzz_lvling'])] as Role[],
    //     weight: faker.random.arrayElement(['Light', 'Medium', 'Heavy']) as Weight,
    //     rune_coeur: faker.random.arrayElement(['Detonate', 'Stoneform', 'Fire_Storm', 'Grasping_Vines']) as Rune_Coeur,
    //     spec: faker.random.arrayElement(['GA_WH', 'SnS_GS', 'GS_HA', 'GS_Spear', 'SnS_Spear', 'Spear_HA', 'GA_BB', 'Healer_DST', 'Healer_Clap']) as Spec,
    //     status_id: 1,
    //   },
    // });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
