import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Seed users
  for (let i = 0; i < 10; i++) {
    await prisma.users.create({
      data: {
        namaDepan: faker.person.firstName(),
        namaBelakang: faker.person.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        balance: parseFloat(faker.finance.amount()),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(["user", "admin"]),
      },
    });
  }

  // Seed movies
  for (let i = 0; i < 5; i++) {
    await prisma.movies.create({
      data: {
        title: faker.lorem.words(3),
        description: faker.lorem.sentences(2),
        director: faker.person.fullName(),
        releaseYear: faker.date.past({ years: 20 }).getFullYear(),
        genre: faker.helpers.arrayElement([
          "Action",
          "Drama",
          "Sci-Fi",
          "Comedy",
        ]),
        price: parseFloat(faker.commerce.price()),
        duration: faker.number.int({ min: 80, max: 180 }),
        video: faker.internet.url(),
        coverImage: faker.image.url(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
