import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception";
import { MetricsController } from "@infra/controllers/metrics/index";

import { GetMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-metrics";
import { GetSocialMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-social-metrics";
import { GetCampaignSocialDataUseCase } from "@application/use-cases/metrics/get-campaign-social-data/get-campaign-social-data";

import { MetricsRepository as IMetricsRepository } from "@domain/repositories/metrics";
import { MetricsRepository } from "@infra/repositories/prisma/metrics";

import { SocialMetricsRepository as ISocialMetricsRepository } from "@domain/repositories/social-metrics";
import { SocialMetricsRepository } from "@infra/repositories/prisma/social-metrics";

import { CampaignRepository } from "@domain/repositories/campaign";
import { PrismaCampaignRepository } from "@infra/repositories/prisma/campaign";

import { AuthTokenGuard } from "@infra/commons/guards/token";
import { RoleGuard } from "@infra/commons/guards/role";
import { PrismaService } from "@infra/config/prisma";
import { TokenModule } from "../token";

@Module({
  imports: [DatabaseModule, ExceptionModule, TokenModule],
  controllers: [MetricsController],
  providers: [
    GetMetricsUseCase,
    GetSocialMetricsUseCase,
    GetCampaignSocialDataUseCase,
    {
      provide: IMetricsRepository,
      useClass: MetricsRepository,
    },
    {
      provide: ISocialMetricsRepository,
      useClass: SocialMetricsRepository,
    },
    {
      provide: CampaignRepository,
      useClass: PrismaCampaignRepository,
    },
    AuthTokenGuard,
    RoleGuard,
    PrismaService,
  ],
})
export class MetricsModule {}
