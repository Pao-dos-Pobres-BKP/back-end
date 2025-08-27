import { UserRole } from "../../src/domain/entities/user-role-enum";
import { Gender } from "../../src/domain/entities/gender-enum";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

const validCPFs: string[] = [
  "123.456.789-00",
  "123.456.789-01",
  "123.456.789-02",
  "123.456.789-03",
  "123.456.789-04",
  "123.456.789-05",
  "123.456.789-06",
  "123.456.789-07",
  "123.456.789-08",
  "123.456.789-09"
];

export const userDonorsMock: Prisma.UserCreateInput[] = Array.from({
  length: 10
}).map((_, index) => ({
  email: faker.internet.email(),
  password: "$2b$10$Hnw5mA3mriUvAt44BdBjIOcxNHt6jEaHN6lRAZPdLnns2nBVtLsqq", // Senha@123,
  role: UserRole.DONOR,
  donor: {
    create: {
      fullName: faker.person.fullName(),
      birthDate: faker.date.birthdate(),
      gender: faker.helpers.arrayElement(Object.values(Gender)),
      phone: faker.phone.number(),
      cpf: validCPFs[index]
    }
  }
}));

userDonorsMock.push({
  email: "admin@example.com",
  password: "$2b$10$Hnw5mA3mriUvAt44BdBjIOcxNHt6jEaHN6lRAZPdLnns2nBVtLsqq", // Senha@123,
  role: UserRole.ADMIN,
  admin: {
    create: {
      root: true
    }
  }
});
