import { faker } from "@faker-js/faker";
import {
  Level,
  PrismaClient,
  RoleType,
  Rune,
  Weapon,
  WeightLimit,
} from "@prisma/client";

const prisma = new PrismaClient();
const numberOfPlayer = 20
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
    console.log("🚀 ~ seed ~ weightList:", weightList)
    const runeList = [
      Rune.Detonate,
      Rune.Fire_Storm,
      Rune.Grasping_Vines,
      Rune.Stoneform,
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
      Weapon.VoidGauntlet
    ];
    console.log("🚀 ~ seed ~ weaponList:", weaponList)

    // Seed additional users
    for (let i = 0; i < numberOfPlayer; i++) {
      await prisma.user.upsert({
        where: { id: i },
        update: {},
        create: {
          id: i,
          username: faker.internet.userName(),
          email: faker.internet.email(),
        },
      });
      // await prisma.role.upsert({
      //   where: { id: i },
      //   update: {},
      //   create: {
      //     id: i,
      //     role: getRandomFromArray(roleList),
      //     rune: getRandomFromArray(runeList),
      //     weapon: getRandomFromArray(weaponList),
      //     weightLimit: getRandomFromArray(weightList),
      //   },
        
      // });
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
