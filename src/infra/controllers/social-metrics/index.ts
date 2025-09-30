import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { GetSocialMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-social-metrics";
import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";

@ApiTags("Social Metrics")
@Controller("metrics/social-distribution")
export class SocialMetricsController {
  constructor(
    private readonly getSocialMetricsUseCase: GetSocialMetricsUseCase,
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetSocialMetricsResponseDTO,
    description:
      "Retorna distribuição de doadores por gênero e faixa etária (últimos 365 dias)",
  })
  async getSocialMetrics(): Promise<GetSocialMetricsResponseDTO> {
    return this.getSocialMetricsUseCase.execute();
  }
}
