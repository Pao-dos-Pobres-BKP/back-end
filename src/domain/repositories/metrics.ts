import {
  GetMetricsResponseDTO,
  PeriodMetricsDTO
} from "@application/dtos/metrics/get-metrics";
import { Gender } from "@domain/entities/gender-enum";
import {
  RangeDatePaymentMethodAmount,
  DonationByPaymentMethodAmount
} from "@application/dtos/metrics/get-donation-by-payment-method";

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

export interface TotalDonationAmountByPaymentMethodResponse {
  rangeDate: RangeDatePaymentMethodAmount;
  totalDonationAmountByPaymentMethodAmount: DonationByPaymentMethodAmount[];
}

export abstract class MetricsRepository {
  abstract getMetrics(): Promise<GetMetricsResponseDTO>;
  abstract getCampaignDonorsStatistics(
    campaignId: string
  ): Promise<DonorStatisticsData[]>;
  abstract findByDateDonationByPaymentMethod(
    startDate: Date,
    endDate: Date
  ): Promise<TotalDonationAmountByPaymentMethodResponse>;
}
