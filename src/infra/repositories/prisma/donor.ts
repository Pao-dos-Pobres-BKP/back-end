import {
  PaginationParams,
  PaginatedEntity
} from "@domain/constants/pagination";
import { Donor } from "@domain/entities/donor";
import {
  CreateDonorParams,
  DonorDetailsResponse,
  DonorRepository,
  DonorWithUser,
  UpdateDonorParams
} from "@domain/repositories/donor";
import { PrismaService } from "@infra/config/prisma";
import { DonorMapper } from "@infra/mappers/prisma/donor-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaDonorRepository implements DonorRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findByIdWithUser(id: string): Promise<DonorWithUser | null> {
    const donor = await this.prisma.donor.findUnique({
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

    if (!donor) {
      return null;
    }

    return {
      id: donor.id,
      email: donor.user.email,
      password: donor.user.password,
      role: donor.user.role,
      cpf: donor.cpf,
      birthDate: donor.birthDate,
      fullName: donor.user.fullName,
      gender: donor.gender,
      phone: donor.phone,
      createdAt: donor.user.createdAt,
      updatedAt: donor.user.updatedAt,
      deletedAt: donor.user.deletedAt
    };
  }

  async findAll({
    page,
    pageSize
  }: PaginationParams): Promise<PaginatedEntity<DonorDetailsResponse>> {
    const { donors, total } = await this.prisma.$transaction(async (tx) => {
      const donors = await tx.donor.findMany({
        where: {
          user: {
            deletedAt: null
          }
        },
        include: {
          user: {
            select: {
              email: true,
              fullName: true
            }
          }
        },
        skip: (page - 1) * pageSize,
        take: pageSize
      });

      const total = await tx.donor.count({
        where: {
          user: {
            deletedAt: null
          }
        }
      });

      return {
        donors,
        total
      };
    });

    return {
      data: donors.map((donor) => ({
        id: donor.id,
        email: donor.user.email,
        birthDate: donor.birthDate,
        cpf: donor.cpf,
        fullName: donor.user.fullName,
        gender: donor.gender,
        phone: donor.phone
      })),
      page,
      lastPage: Math.ceil(total / pageSize),
      total
    };
  }
  async findByEmail(email: string): Promise<Donor | null> {
    const donor = await this.prisma.donor.findFirst({
      where: {
        user: {
          email
        }
      }
    });

    if (!donor) {
      return null;
    }

    return DonorMapper.toDomain(donor);
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

  async findById(id: string): Promise<Donor | null> {
    const donor = await this.prisma.donor.findUnique({
      where: {
        id,
        user: {
          deletedAt: null
        }
      }
    });

    if (!donor) {
      return null;
    }

    return DonorMapper.toDomain(donor);
  }

  async findByCPF(cpf: string): Promise<Donor | null> {
    const donor = await this.prisma.donor.findUnique({
      where: {
        cpf,
        user: {
          deletedAt: null
        }
      }
    });

    if (!donor) {
      return null;
    }

    return DonorMapper.toDomain(donor);
  }

  async create({
    birthDate,
    cpf,
    fullName,
    gender,
    phone,
    email,
    password,
    role
  }: CreateDonorParams): Promise<void> {
    await this.prisma.user.create({
      data: {
        fullName,
        email,
        password,
        role,
        donor: {
          create: {
            birthDate,
            cpf,
            gender,
            phone
          }
        }
      }
    });
  }

  async update(id: string, params: UpdateDonorParams): Promise<void> {
    const {
      email,
      password,
      fullName,
      birthDate,
      gender,
      phone,
      cpf,
      imageUrl
    } = params;

    await this.prisma.donor.update({
      where: { id },
      data: {
        birthDate,
        gender,
        phone,
        cpf,
        user: {
          update: {
            email,
            password,
            fullName,
            imageUrl
          }
        }
      }
    });
  }
}
