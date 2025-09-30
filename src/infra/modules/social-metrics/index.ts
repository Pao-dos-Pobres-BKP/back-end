import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception";

import { SocialMetricsController } from "@infra/controllers/social-metrics/index";
import { GetSocialMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-social-metrics";

import { SocialMetricsRepository as ISocialMetricsRepository } from "@domain/repositories/social-metrics";
import { SocialMetricsRepository } from "@infra/repositories/prisma/social-metrics";

import { AuthTokenGuard } from "@infra/commons/guards/token";
import { RoleGuard } from "@infra/commons/guards/role";
import { PrismaService } from "@infra/config/prisma";

@Module({
  imports: [DatabaseModule, ExceptionModule],
  controllers: [SocialMetricsController],
  providers: [
    GetSocialMetricsUseCase,
    {
      provide: ISocialMetricsRepository,
      useClass: SocialMetricsRepository,
    },
    AuthTokenGuard,
    RoleGuard,
    PrismaService,
  ],
})
export class SocialMetricsModule {}
