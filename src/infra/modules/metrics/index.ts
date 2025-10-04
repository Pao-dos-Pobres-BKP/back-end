import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception";
import { MetricsController } from "@infra/controllers/metrics/index";
import { GetMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-metrics";
import { GetSocialMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-social-metrics";
import { MetricsRepository as IMetricsRepository } from "@domain/repositories/metrics";
import { MetricsRepository } from "@infra/repositories/prisma/metrics";
import { SocialMetricsRepository as ISocialMetricsRepository } from "@domain/repositories/social-metrics";
import { SocialMetricsRepository } from "@infra/repositories/prisma/social-metrics";
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
    {
      provide: IMetricsRepository,
      useClass: MetricsRepository,
    },
    {
      provide: ISocialMetricsRepository,
      useClass: SocialMetricsRepository,
    },
    AuthTokenGuard,
    RoleGuard,
    PrismaService,
  ],
})
export class MetricsModule {}
