import { Injectable, Inject } from "@nestjs/common";
import { MetricsRepository } from "@domain/repositories/metrics";
import { GetMetricsResponseDTO } from "@application/dtos/metrics/get-metrics";

@Injectable()
export class GetMetricsUseCase {
  constructor(
    @Inject(MetricsRepository)
    private readonly metricsRepository: MetricsRepository
  ) {}

  async execute(): Promise<GetMetricsResponseDTO> {
    return await this.metricsRepository.getMetrics();
  }
}
