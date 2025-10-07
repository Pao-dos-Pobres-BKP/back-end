import { Controller, Get } from "@nestjs/common";
import { HealthCheck } from "@nestjs/terminus";
import { HealthUseCase } from "@application/use-cases/health/health";
import { HealthReport } from "@domain/adapters/health";

@Controller("health")
export class HealthController {
  constructor(private readonly healthUseCase: HealthUseCase) {}

  @Get()
  @HealthCheck()
  async execute(): Promise<HealthReport> {
    return this.healthUseCase.execute();
  }
}
