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
const numberOfPlayer = 10;
const numberOfPlayerType = 2
const numberOfWarComposition = 4
const numberOfWars = 10

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
    for (let i = 1; i <= numberOfPlayer ; i++) {
      const user = await prisma.user.upsert({
        where: { id: i },
        update: {},
        create: {
          id: i,
          name: faker.internet.userName(),
          email: faker.internet.email(),
        },
      });

      // Defined Roles
      const role = await prisma.role.upsert({
        where: { id: i },
        update: {},
        create: {
          id: i,
          name: faker.person.firstName(),
          roleType: faker.helpers.arrayElement(roleList),
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

    
    /**
     * @param {readonly any[]} roleList
     * @param {readonly any[]} levelList
     * @param {number} count
     */
    function generatePlayerTypes(roleList, levelList, count) {
      const playerTypes = [];
      for (let i = 1; i <= count; i++) {
        playerTypes.push({
          name: faker.person.firstName(),
          roleType: faker.helpers.arrayElement(roleList),
          level: faker.helpers.arrayElement(levelList),
        });
      }
      return playerTypes;
    }
    
    
    function splitArrayIntoGroups(numberOfPlayers, numberOfWarComposition) {
      if (numberOfWarComposition <= 0) {
        return [];
      }
    
      const playersPerGroup = Math.ceil(numberOfPlayers / numberOfWarComposition);
      const groups = [];
    
      for (let i = 0; i < numberOfWarComposition; i++) {
        const group = [];
    
        for (let j = 0; j < playersPerGroup; j++) {
          const playerIndex = i * playersPerGroup + j;
          if (playerIndex < numberOfPlayers) {
            group.push(playerIndex);
          }
        }
    
        groups.push(group);
      }
    
      return groups;
    }

    const warGroups = splitArrayIntoGroups(numberOfPlayer, numberOfWarComposition);
    console.log("🚀 ~ seed ~ warGroups:", warGroups)

    // Create group war Composition
    for (let i = 0; i < numberOfWarComposition; i++) {  
        await prisma.warComposition.create({
          data: {
            // name: faker.helpers.fromRegExp('Group #[1-10]'),
            name: `Group # ${i}`,
            position: faker.helpers.arrayElement(positionList),
            playerType: {
              create: generatePlayerTypes(roleList, levelList, numberOfPlayerType),
            },
            players: {
              connect: warGroups[i].map(playerId => ({ id: playerId +1})),
            }
          },

      })
    }


    // Create war composed of war composition
    
    

    // Create war stat per player in war
    for (let w = 1; w <= numberOfWars; w++) {
      console.log("🚀 ~ seed ~ war #", w)
      const date = faker.date.recent();
      await prisma.war.create({
        data: {
          name: faker.lorem.word(),
          composition: {
            connect: Array.from({ length: numberOfWarComposition }, (_, i) => ({ id: i + 1 })),
          },
          date
        },
      });
      for (let i = 1; i <= numberOfPlayer; i++) {
      
      await prisma.warStat.create({
          data: {
            player: {
              connect: { id: i },
            },
            war: {connect: {id: w}},
            assist: faker.number.int({ min: 0, max: 10000 }),
            death: faker.number.int({ min: 0, max: 10000 }),
            dmg: faker.number.int({ min: 0, max: 10000 }),
            healing: faker.number.int({ min: 0, max: 10000 }),
            kill: faker.number.int({ min: 0, max: 10000 }),
          },
        });      
      }
      console.log("🚀 ~ seed ~ warStat Created")
  }
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
