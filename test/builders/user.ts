import { UserRole } from "@domain/entities/role";
import { User } from "@domain/entities/user";
import { faker } from "@faker-js/faker";

export const createMockUser = (override: Partial<User> = {}): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: faker.helpers.arrayElement(Object.values(UserRole)),
  cpf: faker.string.numeric(11),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  createdAt: faker.date.past({ years: 1 }),
  updatedAt: new Date(),
  ...override
});
