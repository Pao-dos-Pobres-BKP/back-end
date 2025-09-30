import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception";

import { SocialMetricsController } from "@infra/controllers/social-metrics/index";
import { GetSocialMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-social-metrics";

import { SocialMetricsRepository as ISocialMetricsRepository } from "@domain/repositories/social-metrics";
import { SocialMetricsRepository } from "@infra/repositories/prisma/social-metrics";

import { PrismaService } from "@infra/config/prisma";
import { TokenModule } from "@infra/modules/token"; 

@Module({
  imports: [DatabaseModule, ExceptionModule, TokenModule], 
  controllers: [SocialMetricsController],
  providers: [
    GetSocialMetricsUseCase,
    {
      provide: ISocialMetricsRepository,
      useClass: SocialMetricsRepository,
    },
    PrismaService,
  ],
})
export class SocialMetricsModule {}
