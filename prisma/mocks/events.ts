import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

export const eventsMock: Prisma.EventsCreateInput[] = Array.from({
  length: 20
}).map(() => {
  const dateStart = faker.date.future();

  return {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    dateStart,
    dateEnd: faker.date.soon({
      days: faker.number.int({ min: 1, max: 7 }),
      refDate: dateStart
    }),
    location: faker.location.streetAddress(),
    url: faker.internet.url()
  };
});
