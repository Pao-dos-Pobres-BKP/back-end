import {
  GetMetricsResponseDTO,
  PeriodMetricsDTO
} from "@application/dtos/metrics/get-metrics";
import { Gender } from "@domain/entities/gender-enum";
import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";

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

  abstract getSocialMetrics(
    startDate: Date,
    endDate: Date
  ): Promise<GetSocialMetricsResponseDTO>;
}
