import { User } from "@domain/entities/donor";
import { User as PrismaUser } from "@prisma/client";

export class PrismaUserMapper {
  static toDomain(user: PrismaUser): User {
    return new User(
      {
        email: user.email,
        password: user.password
      },
      user.id
    );
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      email: user.email,
      password: user.password
    };
  }
}
