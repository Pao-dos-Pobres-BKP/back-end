import { DonorRepository } from "@domain/repositories/donor";
import { PrismaService } from "@infra/config/prisma";
import { PrismaUserRepository } from "@infra/repositories/prisma/user-repository";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    {
      provide: DonorRepository,
      useClass: PrismaUserRepository
    }
  ],
  exports: [DonorRepository]
})
export class DatabaseModule {}
