import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";
import { HealthController } from "@infra/controllers/health";
import { PrismaService } from "@infra/config/prisma";
import { HealthUseCase } from "@application/use-cases/health/health";

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [PrismaService, HealthUseCase]
})
export class HealthModule {}
