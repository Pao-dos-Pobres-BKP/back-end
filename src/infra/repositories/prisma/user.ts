import { Transaction } from "@domain/adapters/transaction";
import { User } from "@domain/entities/user";
import { CreateUserParams, UserRepository } from "@domain/repositories/user";
import { PrismaService } from "@infra/config/prisma";
import { UserMapper } from "@infra/mappers/prisma/user-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async create(
    { email, password, role }: CreateUserParams,
    tx?: Transaction
  ): Promise<User> {
    const dbInstance = tx ?? this.prisma;

    const userCreated = await dbInstance.user.create({
      data: {
        email,
        password,
        role
      }
    });

    return UserMapper.toDomain(userCreated);
  }
}
