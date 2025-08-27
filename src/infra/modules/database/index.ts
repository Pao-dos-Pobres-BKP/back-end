import { DonorRepository } from "@domain/repositories/donor";
import { UserRepository } from "@domain/repositories/user";
import { PrismaService } from "@infra/config/prisma";
import { PrismaDonorRepository } from "@infra/repositories/prisma/donor";
import { PrismaUserRepository } from "@infra/repositories/prisma/user";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    {
      useClass: PrismaDonorRepository,
      provide: DonorRepository
    },
    {
      useClass: PrismaUserRepository,
      provide: UserRepository
    }
  ],
  exports: [DonorRepository, UserRepository]
})
export class DatabaseModule {}
