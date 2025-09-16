import {
  PaginatedEntity,
  PaginationParams
} from "@domain/constants/pagination";
import { Donation } from "@domain/entities/donation";
import {
  CreateDonationParams,
  DonationDetailsResponse,
  DonationRepository,
  UpdateDonationParams
} from "@domain/repositories/donation";
import { PrismaService } from "@infra/config/prisma";
import { DonationMapper } from "@infra/mappers/prisma/donation-mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaDonationRepository implements DonationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Donation | null> {
    const donation = await this.prisma.donation.findUnique({
      where: { id }
    });
    if (!donation) return null;
    return DonationMapper.toDomain(donation);
  }

  async findAllByDonor(
    donorId: string,
    { page, pageSize }: PaginationParams
  ): Promise<PaginatedEntity<DonationDetailsResponse>> {
    const safePage = page ? Number(page) : 1;
    const safePageSize = pageSize ? Number(pageSize) : 10;
    const [donations, total] = await Promise.all([
      this.prisma.donation.findMany({
        where: { donorId },
        skip: (safePage - 1) * safePageSize,
        take: safePageSize
      }),
      this.prisma.donation.count({ where: { donorId } })
    ]);

    return {
      data: donations.map(DonationMapper.toDomain),
      page: safePage,
      lastPage: Math.ceil(total / safePageSize),
      total
    };
  }

  async create(params: CreateDonationParams): Promise<void> {
    await this.prisma.donation.create({
      data: {
        amount: params.amount,
        periodicity: params.periodicity,
        campaignId: params.campaignId,
        ...(params.donorId && { donorId: params.donorId })
      }
    });
  }

  async update(id: string, params: UpdateDonationParams): Promise<void> {
    await this.prisma.donation.update({
      where: { id },
      data: { ...params }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.donation.delete({
      where: { id }
    });
  }
}
