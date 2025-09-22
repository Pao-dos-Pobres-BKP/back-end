import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionModule } from "../exception";
import { MetricsController } from "@infra/controllers/metrics/index";
import { GetMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-metrics";
import { MetricsRepository as IMetricsRepository } from "@domain/repositories/metrics";
import { MetricsRepository } from "@infra/repositories/prisma/metrics";
import { AuthTokenGuard } from "@infra/commons/guards/token";
import { RoleGuard } from "@infra/commons/guards/role";
import { PrismaService } from "@infra/config/prisma";

@Module({
  imports: [DatabaseModule, ExceptionModule],
  controllers: [MetricsController],
  providers: [
    GetMetricsUseCase,
    {
      provide: IMetricsRepository,
      useClass: MetricsRepository
    },
    AuthTokenGuard,
    RoleGuard,
    PrismaService
  ]
})
export class MetricsModule {}
