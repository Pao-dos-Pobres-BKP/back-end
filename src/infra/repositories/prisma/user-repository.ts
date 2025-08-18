import {
  PaginationParams,
  PaginatedEntity
} from "@domain/constants/pagination";
import { PrismaService } from "@infra/config/prisma";
import { Injectable } from "@nestjs/common";
import { User as PrismaUser } from "@prisma/client";

@Injectable()
export class PrismaUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const data = toPrisma(user);

    const newUser = await this.prisma.user.create({
      data
    });

    return toDomain(newUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    return user ? toDomain(user) : null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    return user ? toDomain(user) : null;
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
      data: users.map(toDomain),
      page,
      lastPage: Math.ceil(total / pageSize),
      total
    };
  }

  async update(id: string, user: User): Promise<User> {
    const data = toPrisma(user);

    const userUpdated = await this.prisma.user.update({
      where: {
        id
      },
      data
    });

    return toDomain(userUpdated);
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

export interface User {
  id: string;
  email: string;
  password: string;
}

function toDomain(user: PrismaUser): User {
  return {
    id: user.id,
    email: user.email,
    password: user.password
  };
}

function toPrisma(user: User): PrismaUser {
  return {
    id: user.id,
    email: user.email,
    password: user.password
  };
}
