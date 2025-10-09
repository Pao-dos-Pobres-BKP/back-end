import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export const newsMock: Prisma.NewsCreateInput[] = Array.from({
  length: 50
}).map(() => ({
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraphs(2),
  date: faker.date.recent(),
  location: faker.location.streetAddress(),
  url: faker.internet.url(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent()
}));
