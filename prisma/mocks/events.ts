import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export const eventsMock: Prisma.EventsCreateInput[] = Array.from({
  length: 10
}).map(() => ({
  title: faker.lorem.words(3),
  description: faker.lorem.sentence(),
  dateStart: faker.date.future(),
  dateEnd: faker.date.future(),
  location: faker.location.streetAddress(),
  url: faker.internet.url()
}));
