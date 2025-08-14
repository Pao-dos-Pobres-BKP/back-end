import { User } from "@domain/entities/user";
import { User as PrismaUser } from "@prisma/client";

export class PrismaUserMapper {
  static toDomain(user: PrismaUser): User {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      cpf: user.cpf,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      role: user.role,
      cpf: user.cpf,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
