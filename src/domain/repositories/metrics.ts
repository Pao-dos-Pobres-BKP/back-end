import {
  GetMetricsResponseDTO,
  PeriodMetricsDTO
} from "@application/dtos/metrics/get-metrics";
import { Gender } from "@domain/entities/gender-enum";

export interface Metrics {
  last_30_days: PeriodMetricsDTO;
  last_365_days: PeriodMetricsDTO;
}

export interface DonorStatisticsData {
  id: string;
  fullName: string;
  gender: Gender;
  birthDate: Date;
}

export abstract class MetricsRepository {
  abstract getMetrics(): Promise<GetMetricsResponseDTO>;
  abstract getCampaignDonorsStatistics(
    campaignId: string
  ): Promise<DonorStatisticsData[]>;
}
