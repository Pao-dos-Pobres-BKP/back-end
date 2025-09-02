import { PaginatedEntity } from "@domain/constants/pagination";
import {
  AdminDetailsResponse,
  AdminRepository,
  AdminWithUser,
  CreateAdminParams,
  UpdateAdminParams
} from "@domain/repositories/admin";
import { PrismaService } from "@infra/config/prisma";
import { AdminMapper } from "@infra/mappers/prisma/admin-mapper";
import { Injectable } from "@nestjs/common";
import { Admin } from "@prisma/client";

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findByIdWithUser(id: string): Promise<AdminWithUser | null> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id,
        user: {
          deletedAt: null
        }
      },
      include: {
        user: true
      }
    });

    if (!admin) {
      return null;
    }

    return {
      id: admin.id,
      email: admin.user.email,
      password: admin.user.password,
      role: admin.user.role,
      root: admin.root,
      createdAt: admin.user.createdAt,
      updatedAt: admin.user.updatedAt,
      deletedAt: admin.user.deletedAt
    };
  }

  async findAll({
    page,
    pageSize
  }): Promise<PaginatedEntity<AdminDetailsResponse>> {
    const { admins, total } = await this.prisma.$transaction(async (tx) => {
      const admins = await tx.admin.findMany({
        where: {
          user: {
            deletedAt: null
          }
        },
        include: {
          user: {
            select: {
              email: true
            }
          }
        },
        skip: (page - 1) * pageSize,
        take: pageSize
      });

      const total = await tx.admin.count({
        where: {
          user: {
            deletedAt: null
          }
        }
      });

      return { admins, total };
    });

    return {
      data: admins.map((admin) => ({
        id: admin.id,
        email: admin.user.email,
        root: admin.root
      })),
      page,
      lastPage: Math.ceil(total / pageSize),
      total
    };
  }
  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findFirst({
      where: {
        user: {
          email
        }
      }
    });

    if (!admin) {
      return null;
    }

    return AdminMapper.toDomain(admin);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    });
  }

  async findById(id: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id,
        user: {
          deletedAt: null
        }
      }
    });

    if (!admin) {
      return null;
    }

    return AdminMapper.toDomain(admin);
  }

  async create({
    email,
    password,
    role,
    root
  }: CreateAdminParams): Promise<void> {
    await this.prisma.user.create({
      data: {
        email,
        password,
        role,
        admin: {
          create: {
            root
          }
        }
      }
    });
  }

  async update(id: string, params: UpdateAdminParams): Promise<void> {
    const { email, password, root } = params;

    await this.prisma.admin.update({
      where: { id },
      data: {
        root,
        user: {
          update: {
            email,
            password
          }
        }
      }
    });
  }
}
