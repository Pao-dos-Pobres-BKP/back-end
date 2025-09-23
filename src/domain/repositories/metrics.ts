import { PeriodMetricsDTO } from "@application/dtos/metrics/get-metrics";

export interface Metrics {
  last_30_days: PeriodMetricsDTO;
  last_365_days: PeriodMetricsDTO;
}

export abstract class MetricsRepository {
  abstract getMetrics(days: number): Promise<PeriodMetricsDTO>;
}
