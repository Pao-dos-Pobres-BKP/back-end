import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { GetMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-metrics";
import { GetCampaignSocialDataUseCase } from "@application/use-cases/metrics/get-campaign-social-data/get-campaign-social-data";
import { GetSocialMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-social-metrics";
import {
  GetMetricsResponseDTO,
  FindGlobalMetricsResponse
} from "@application/dtos/metrics/get-metrics";
import {
  CampaignSocialDataResponse
} from "@application/dtos/metrics/campaign-social-data";
import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";

@ApiTags("Metrics")
@Controller("metrics")
export class MetricsController {
  constructor(
    private readonly getMetricsUseCase: GetMetricsUseCase,
    private readonly getCampaignSocialDataUseCase: GetCampaignSocialDataUseCase,
    private readonly getSocialMetricsUseCase: GetSocialMetricsUseCase
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetMetricsResponseDTO,
    description: "Retorna métricas globais para o dashboard"
  })
  async getMetrics(): Promise<GetMetricsResponseDTO> {
    return await this.getMetricsUseCase.execute();
  }

  @Get("campaigns/:id/social-data")
  @ApiOkResponse({
    type: CampaignSocialDataResponse,
    description: "Retorna dados sociais de uma campanha específica"
  })
  async getCampaignSocialData(
    @Param("id") id: string
  ): Promise<CampaignSocialDataResponse> {
    return await this.getCampaignSocialDataUseCase.execute(id);
  }

  @Get("social-distribution")
  @ApiQuery({ name: "days", required: false, example: 365 })
  @ApiOkResponse({
    type: GetSocialMetricsResponseDTO,
    description: "Retorna distribuição de doadores por gênero e faixa etária"
  })
  async getSocialMetrics(
    @Query("days") days = 365
  ): Promise<GetSocialMetricsResponseDTO> {
    return this.getSocialMetricsUseCase.execute(days);
  }
}
