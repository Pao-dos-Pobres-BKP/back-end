import { MetricsRepository } from "@domain/repositories/metrics";
import { PeriodMetricsDTO } from "@application/dtos/metrics/get-metrics";

export class MetricsRepositoryStub implements MetricsRepository {
  async getMetrics(days: number): Promise<PeriodMetricsDTO> {
    return {
      total_raised: days === 30 ? 3000 : 50000,
      new_donors: days === 30 ? 10 : 120,
      recurring_donations: days === 30 ? 3 : 25,
      total_donations: days === 30 ? 15 : 300,
      average_ticket: days === 30 ? 200 : 166.67
    };
  }
}
