import { faker } from "@faker-js/faker";
import { Prisma, Gender, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const validCPFs: string[] = [
  "11144477735", "02343245678", "12345678901", "98765432100", "11122233344",
  "55566677788", "44455566677", "88899900011", "22233344455", "66677788899",
  "33344455566", "77788899900", "14725836900", "36925814711", "15975348622",
  "48615975333", "25814736944", "75315948655", "95135748666", "45678912377",
  "78912345688", "32165498799", "65432178900", "98732165411", "74185296322",
  "96374185233", "85274196344", "14796385255", "78945612366", "45612378977",
  "12378945688", "78965432199", "65478912300", "32198765411", "98712365422",
  "74196385233", "96385274144", "85296374155", "15948675366", "48675315977",
  "75348615988", "25836914799", "36914725800", "14736925811", "95148635722",
  "48635795133", "35795148644", "15935748655", "35748615966", "48615935377",
  "25895114788", "95114725899", "11144477700", "02343245601", "12345678902",
];

const genders: Gender[] = [Gender.MALE, Gender.FEMALE, Gender.OTHER];


const passwordHashed = bcrypt.hashSync("Password@1234", 10);

export const userDonorsMock: Prisma.UserCreateInput[] = [
  {
    email: "donor@email.com",
    password: passwordHashed,
    role: UserRole.DONOR,
    fullName: "Doador Principal",
    donor: {
      create: {
        birthDate: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
        gender: Gender.FEMALE,
        phone:`(${faker.helpers.arrayElement(['11', '21', '31', '41', '51', '61', '71', '81', '85'])}) 9${faker.string.numeric(4)}-${faker.string.numeric(4)}`,
        cpf: validCPFs[0]
      }
    }
  },
  ...Array.from({ length: 49 }).map((_, index) => ({
    email: faker.internet.email(),
    password: passwordHashed,
    role: UserRole.DONOR,
    fullName: faker.person.fullName(),
    donor: {
      create: {
        birthDate: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
        gender: faker.helpers.arrayElement(genders),
        phone: `(${faker.helpers.arrayElement(['11', '21', '31', '41', '51', '61', '71', '81', '85'])}) 9${faker.string.numeric(4)}-${faker.string.numeric(4)}`,
        cpf: validCPFs[index + 1]
      }
    }
  })),
  
  ...Array.from({ length: 5 }).map((_, index) => ({
    email: `donor.deleted${index + 1}@example.com`,
    password: passwordHashed,
    role: UserRole.DONOR,
    fullName: `${faker.person.fullName()} (Deletado)`,
    deletedAt: faker.date.recent({ days: 30 }),
    donor: {
      create: {
        birthDate: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
        gender: faker.helpers.arrayElement(genders),
        phone: `(${faker.helpers.arrayElement(['11', '21', '31', '41', '51', '61', '71', '81', '85'])}) 9${faker.string.numeric(4)}-${faker.string.numeric(4)}`,
        cpf: validCPFs[index + 50]
      }
    }
  }))
];
export const userAdminsMock: Prisma.UserCreateInput[] = [
  {
    email: "admin@email.com",
    fullName: "Admin Principal",
    password: passwordHashed,
    role: UserRole.ADMIN,
    admin: {
      create: {
        root: true
      }
    }
  },
  ...Array.from({ length: 4 }).map((_, index) => ({
    email: `admin${index + 1}@example.com`,
    fullName: faker.person.fullName(),
    password: passwordHashed,
    role: UserRole.ADMIN,
    admin: {
      create: {
        root: index < 2
      }
    }
  }))
];