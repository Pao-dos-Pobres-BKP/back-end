import { DonorRepository } from "@domain/repositories/donor";
import { PrismaService } from "@infra/config/prisma";
import { PrismaDonorRepository } from "@infra/repositories/prisma/donor";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    {
      useClass: PrismaDonorRepository,
      provide: DonorRepository
    }
  ],
  exports: [DonorRepository]
})
export class DatabaseModule {}
