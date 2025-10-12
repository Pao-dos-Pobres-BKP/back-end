import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception";
import { MetricsController } from "@infra/controllers/metrics/index";

import { GetMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-metrics";
import { GetSocialMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-social-metrics";
import { GetCampaignSocialDataUseCase } from "@application/use-cases/metrics/get-campaign-social-data/get-campaign-social-data";

import { MetricsRepository as IMetricsRepository } from "@domain/repositories/metrics";
import { MetricsRepository } from "@infra/repositories/prisma/metrics";

import { CampaignRepository } from "@domain/repositories/campaign";
import { PrismaCampaignRepository } from "@infra/repositories/prisma/campaign";

import { AuthTokenGuard } from "@infra/commons/guards/token";
import { RoleGuard } from "@infra/commons/guards/role";
import { PrismaService } from "@infra/config/prisma";
import { TokenModule } from "../token";
import { GetDonationByPaymentMethodAndDateUseCase } from "@application/use-cases/metrics/get-donation-by-payment-method/get-donation-by-payment-method";
import { CampaignMetricsUseCase } from "@application/use-cases/metrics/campaign-metrics/campaign-metrics";
import { GetDonationsRaisedByPeriodUseCase } from "@application/use-cases/metrics/get-donations-raised-by-period/get-donations-raised-by-period";

@Module({
  imports: [DatabaseModule, ExceptionModule, TokenModule],
  controllers: [MetricsController],
  providers: [
    GetMetricsUseCase,
    GetSocialMetricsUseCase,
    GetCampaignSocialDataUseCase,
    GetDonationByPaymentMethodAndDateUseCase,
    GetDonationsRaisedByPeriodUseCase,
    {
      provide: IMetricsRepository,
      useClass: MetricsRepository
    },
    {
      provide: CampaignRepository,
      useClass: PrismaCampaignRepository
    },
    AuthTokenGuard,
    RoleGuard,
    PrismaService,
    CampaignMetricsUseCase
  ]
})
export class MetricsModule {}
