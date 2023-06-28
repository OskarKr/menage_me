import { Priority, PrismaClient, Status } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
const prorities: Priority[] = ["LOW", "MEDIUM", "HIGH"];

const seed = async () => {
  await prisma.functionality.deleteMany();
  await prisma.task.deleteMany();

  for (let i = 0; i < 10; i++) {
    const functionality = await prisma.functionality.create({
      data: {
        name: faker.lorem.words({ min: 2, max: 5 }),
        description: faker.lorem.paragraph({ min: 2, max: 5 }),
        priority: prorities[Math.floor(Math.random() * prorities.length)],
        status: "TODO",
      },
    });

    for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
      await prisma.task.create({
        data: {
          name: faker.lorem.words({ min: 2, max: 5 }),
          description: faker.lorem.paragraph({ min: 2, max: 5 }),
          priority: prorities[Math.floor(Math.random() * prorities.length)],
          status: "TODO",
          functionalityId: functionality.id,
        },
      });
    }
  }
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
