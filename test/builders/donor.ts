import { Donor } from "@domain/entities/donor";
import { Gender } from "@domain/entities/gender-enum";
import { faker } from "@faker-js/faker";

export const createMockDonor = (override: Partial<Donor> = {}): Donor => ({
  id: faker.string.uuid(),
  fullName: faker.person.fullName(),
  birthDate: faker.date.past({ years: 10 }),
  gender: faker.helpers.arrayElement(Object.values(Gender)),
  phone: faker.phone.number(),
  cpf: faker.string.numeric(11),
  ...override
});
