import { UserRole } from "@domain/entities/role";
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
  }
];
