import { MetricsRepository } from "@domain/repositories/metrics";
import { GetMetricsResponseDTO, PeriodMetricsDTO } from "@application/dtos/metrics/get-metrics";

export class MetricsRepositoryStub implements MetricsRepository {
  async getMetrics(): Promise<GetMetricsResponseDTO> {
    const mockPeriodData: PeriodMetricsDTO = {
      total_raised: 50000,
      new_donors: 120,
      recurring_donations: 25,
      total_donations: 300,
      average_ticket: 166.67
    };

    return {
      last_30_days: {
        total_raised: 3000,
        new_donors: 10,
        recurring_donations: 3,
        total_donations: 15,
        average_ticket: 200
      },
      last_365_days: mockPeriodData
    };
  }
}
