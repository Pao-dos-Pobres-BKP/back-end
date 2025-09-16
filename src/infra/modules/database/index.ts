import { DonorRepository } from "@domain/repositories/donor";
import { PrismaService } from "@infra/config/prisma";
import { PrismaDonorRepository } from "@infra/repositories/prisma/donor";
import { Module } from "@nestjs/common";
import { DonationRepository } from "@domain/repositories/donation";
import { PrismaDonationRepository } from "@infra/repositories/prisma/donation";

@Module({
  providers: [
    PrismaService,
    {
      provide: DonorRepository,
      useClass: PrismaDonorRepository
    },
    {
      provide: DonationRepository,
      useClass: PrismaDonationRepository
    }
  ],
  exports: [DonorRepository, DonationRepository]
})
export class DatabaseModule {}
