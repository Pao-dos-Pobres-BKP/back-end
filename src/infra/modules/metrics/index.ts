import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception";
import { MetricsController } from "@infra/controllers/metrics/index";
import { GetMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-metrics";
import { GetCampaignSocialDataUseCase } from "@application/use-cases/metrics/get-campaign-social-data/get-campaign-social-data";
import { MetricsRepository as IMetricsRepository } from "@domain/repositories/metrics";
import { MetricsRepository } from "@infra/repositories/prisma/metrics";
import { CampaignRepository } from "@domain/repositories/campaign";
import { PrismaCampaignRepository } from "@infra/repositories/prisma/campaign";
import { AuthTokenGuard } from "@infra/commons/guards/token";
import { RoleGuard } from "@infra/commons/guards/role";
import { PrismaService } from "@infra/config/prisma";
import { TokenModule } from "../token";
import { GetDonationByPaymentMethodAndDateUseCase } from "@application/use-cases/metrics/get-donation-by-payment-method/find-by-date/get-donation-by-payment-method";

@Module({
  imports: [DatabaseModule, ExceptionModule, TokenModule],
  controllers: [MetricsController],
  providers: [
    GetMetricsUseCase,
    GetCampaignSocialDataUseCase,
    GetDonationByPaymentMethodAndDateUseCase,
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
    PrismaService
  ]
})
export class MetricsModule {}
