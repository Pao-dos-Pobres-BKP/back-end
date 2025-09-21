import { AdminRepository } from "@domain/repositories/admin";
import { DonorRepository } from "@domain/repositories/donor";
import { EventRepository } from "@domain/repositories/event";
import { UserRepository } from "@domain/repositories/user";
import { NewsRepository } from "@domain/repositories/news";

import { PrismaService } from "@infra/config/prisma";
import { PrismaAdminRepository } from "@infra/repositories/prisma/admin";
import { PrismaDonorRepository } from "@infra/repositories/prisma/donor";
import { PrismaEventRepository } from "@infra/repositories/prisma/event";
import { PrismaUserRepository } from "@infra/repositories/prisma/user";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";

import { Module } from "@nestjs/common";

@Module({
  providers: [
    PrismaService,
    {
      useClass: PrismaAdminRepository,
      provide: AdminRepository
    },
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
    },
    {
      useClass: PrismaNewsRepository,
      provide: NewsRepository
    }
  ],
  exports: [
    AdminRepository,
    DonorRepository,
    UserRepository,
    EventRepository,
    NewsRepository
  ]
})
export class DatabaseModule {}
