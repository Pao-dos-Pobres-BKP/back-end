import { UserRole } from "@domain/entities/user-role-enum";
import { User } from "@domain/entities/user";
import { faker } from "@faker-js/faker";

export const createMockUser = (override: Partial<User> = {}): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  password: faker.string.hexadecimal({ length: 10 }),
  role: faker.helpers.arrayElement(Object.values(UserRole)),
  createdAt: faker.date.past({ years: 1 }),
  updatedAt: new Date(),
  ...override
});
