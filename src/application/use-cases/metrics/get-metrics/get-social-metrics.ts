import { Injectable, Inject } from "@nestjs/common";
import { SocialMetricsRepository } from "@domain/repositories/social-metrics";
import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";

@Injectable()
export class GetSocialMetricsUseCase {
  constructor(private readonly repo: SocialMetricsRepository) {}

  async execute(days: number): Promise<GetSocialMetricsResponseDTO> {
    return await this.repo.getSocialMetrics(days);
  }
}
