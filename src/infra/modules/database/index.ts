import { AdminRepository } from "@domain/repositories/admin";
import { CampaignRepository } from "@domain/repositories/campaign";
import { DonorRepository } from "@domain/repositories/donor";
import { EventRepository } from "@domain/repositories/event";
import { UserRepository } from "@domain/repositories/user";
import { NewsRepository } from "@domain/repositories/news";

import { PrismaService } from "@infra/config/prisma";
import { PrismaAdminRepository } from "@infra/repositories/prisma/admin";
import { PrismaCampaignRepository } from "@infra/repositories/prisma/campaign";
import { PrismaDonorRepository } from "@infra/repositories/prisma/donor";
import { PrismaEventRepository } from "@infra/repositories/prisma/event";
import { PrismaUserRepository } from "@infra/repositories/prisma/user";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";

import { Module } from "@nestjs/common";
import { DonationRepository } from "@domain/repositories/donation";
import { PrismaDonationRepository } from "@infra/repositories/prisma/donation";

@Module({
  providers: [
    PrismaService,
    {
      useClass: PrismaAdminRepository,
      provide: AdminRepository
    },
    {
      provide: CampaignRepository,
      useClass: PrismaCampaignRepository
    },
    {
      provide: DonorRepository,
      useClass: PrismaDonorRepository
    },
    {
      provide: DonationRepository,
      useClass: PrismaDonationRepository
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
    CampaignRepository,
    DonorRepository,
    UserRepository,
    EventRepository,
    NewsRepository,
    DonationRepository
  ]
})
export class DatabaseModule {}
