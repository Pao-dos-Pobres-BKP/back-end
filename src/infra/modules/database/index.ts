import { Module } from "@nestjs/common";
import { PrismaService } from "@infra/config/prisma";

import { DonorRepository } from "@domain/repositories/donor";
import { PrismaDonorRepository } from "@infra/repositories/prisma/donor";

import { NewsRepository } from "@domain/repositories/news";
import { PrismaNewsRepository } from "@infra/repositories/prisma/news";

@Module({
  providers: [
    PrismaService,
    { provide: DonorRepository, useClass: PrismaDonorRepository },
    { provide: NewsRepository, useClass: PrismaNewsRepository }
  ],
  exports: [DonorRepository, NewsRepository]
})
export class DatabaseModule {}
