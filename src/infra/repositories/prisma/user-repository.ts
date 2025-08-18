import {
  PaginationParams,
  PaginatedEntity
} from "@domain/constants/pagination";
import { User } from "@domain/entities/user";
import { UserRepository } from "@domain/repositories/user";
import { PrismaService } from "@infra/config/prisma";
import { PrismaUserMapper as UserMapper } from "@infra/mappers/prisma/user-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const data = UserMapper.toPrisma(user);

    const newUser = await this.prisma.user.create({
      data
    });

    return UserMapper.toDomain(newUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findAllUsers({
    page = 1,
    pageSize = 10
  }: PaginationParams): Promise<PaginatedEntity<User>> {
    const { users, total } = await this.prisma.$transaction(async (tx) => {
      const users = await tx.user.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize
      });

      const total = await tx.user.count();

      return {
        users,
        total
      };
    });

    return {
      data: users.map(UserMapper.toDomain),
      page,
      lastPage: Math.ceil(total / pageSize),
      total
    };
  }

  async update(id: string, user: User): Promise<User> {
    const data = UserMapper.toPrisma(user);

    const userUpdated = await this.prisma.user.update({
      where: {
        id
      },
      data
    });

    return UserMapper.toDomain(userUpdated);
  }

  async delete(id: string): Promise<boolean> {
    const userDeleted = await this.prisma.user.delete({
      where: {
        id
      }
    });

    return !!userDeleted;
  }
}
