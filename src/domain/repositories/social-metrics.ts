import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";

export abstract class SocialMetricsRepository {
  abstract getSocialMetrics(days: number): Promise<GetSocialMetricsResponseDTO>;
}
