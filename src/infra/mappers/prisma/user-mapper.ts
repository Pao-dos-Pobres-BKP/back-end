import { User } from "@domain/entities/user";
import { User as PrismaUser } from "@prisma/client";

export class UserMapper {
  static toDomain(user: PrismaUser): User {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}
