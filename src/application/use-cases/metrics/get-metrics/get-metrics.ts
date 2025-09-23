import { Injectable, Inject } from "@nestjs/common";
import { MetricsRepository } from "@domain/repositories/metrics";
import {
  GetMetricsResponseDTO,
  PeriodMetricsDTO
} from "@application/dtos/metrics/get-metrics";

@Injectable()
export class GetMetricsUseCase {
  constructor(
    @Inject(MetricsRepository)
    private readonly metricsRepository: MetricsRepository
  ) {}

  async execute(): Promise<GetMetricsResponseDTO> {
    const last30Days: PeriodMetricsDTO =
      await this.metricsRepository.getMetrics(30);

    const last365Days: PeriodMetricsDTO =
      await this.metricsRepository.getMetrics(365);

    return {
      last_30_days: last30Days,
      last_365_days: last365Days
    };
  }
}
