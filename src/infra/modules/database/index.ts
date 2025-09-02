import { DonorRepository } from "@domain/repositories/donor";
import { EventRepository } from "@domain/repositories/event";
import { UserRepository } from "@domain/repositories/user";
import { PrismaService } from "@infra/config/prisma";
import { PrismaDonorRepository } from "@infra/repositories/prisma/donor";
import { PrismaEventRepository } from "@infra/repositories/prisma/event";
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
    },
    {
      useClass: PrismaEventRepository,
      provide: EventRepository
    }
  ],
  exports: [DonorRepository, UserRepository, EventRepository]
})
export class DatabaseModule {}
