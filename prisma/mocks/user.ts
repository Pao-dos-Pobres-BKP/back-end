import { UserRole } from "@domain/entities/user-role-enum";
import { Prisma } from "@prisma/client";

export const userMock: Prisma.UserCreateManyInput[] = [
  {
    email: "admin@example.com",
    password: "Senha@123",
    name: "Admin",
    role: UserRole.ADMIN,
    cpf: "85303050420",
    phone: "11999999999",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP"
  },
  {
    email: "donor@example.com",
    password: "Senha@123",
    name: "Donor",
    role: UserRole.DONOR,
    cpf: "12345678901",
    phone: "11988888888",
    address: "Avenida das Palmeiras, 456",
    city: "Rio de Janeiro",
    state: "RJ"
  }
];
