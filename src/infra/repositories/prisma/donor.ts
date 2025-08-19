import { Transaction } from "@domain/adapters/transaction";
import { Donor } from "@domain/entities/donor";
import { CreateDonorParams, DonorRepository } from "@domain/repositories/donor";
import { PrismaService } from "@infra/config/prisma";
import { DonorMapper } from "@infra/mappers/prisma/donor-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaDonorRepository implements DonorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByCPF(cpf: string): Promise<Donor | null> {
    const donor = await this.prisma.donor.findUnique({
      where: {
        cpf
      }
    });

    if (!donor) {
      return null;
    }

    return DonorMapper.toDomain(donor);
  }

  async create(
    { birthDate, cpf, fullName, gender, phone }: CreateDonorParams,
    tx?: Transaction
  ): Promise<Donor> {
    const dbInstance = tx ?? this.prisma;

    const donorCreated = await dbInstance.donor.create({
      data: {
        birthDate,
        cpf,
        fullName,
        gender,
        phone
      }
    });

    return DonorMapper.toDomain(donorCreated);
  }
}
