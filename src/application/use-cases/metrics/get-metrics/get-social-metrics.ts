import { Injectable, Inject } from "@nestjs/common";
import { SocialMetricsRepository } from "@domain/repositories/social-metrics";
import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";

@Injectable()
export class GetSocialMetricsUseCase {
  constructor(
    @Inject(SocialMetricsRepository)
    private readonly socialMetricsRepository: SocialMetricsRepository
  ) {}

  async execute(): Promise<GetSocialMetricsResponseDTO> {
    return this.socialMetricsRepository.getSocialMetrics();
  }
}
