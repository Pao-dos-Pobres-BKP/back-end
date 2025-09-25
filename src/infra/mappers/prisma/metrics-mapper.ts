import { PeriodMetricsDTO } from "@application/dtos/metrics/get-metrics";

type RawMetrics = {
  total_raised: string | number | null;
  new_donors: string | number | null;
  recurring_donations: string | number | null;
  total_donations: string | number | null;
  average_ticket: string | number | null;
};

export class MetricsMapper {
  static toPeriodMetrics(raw: RawMetrics): PeriodMetricsDTO {
    return {
      total_raised: Number(raw.total_raised) || 0,
      new_donors: Number(raw.new_donors) || 0,
      recurring_donations: Number(raw.recurring_donations) || 0,
      total_donations: Number(raw.total_donations) || 0,
      average_ticket: Number(raw.average_ticket) || 0
    };
  }
}
