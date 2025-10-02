import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-metrics";
import {
  FindGlobalMetricsResponse,
  GetMetricsResponseDTO
} from "@application/dtos/metrics/get-metrics";
import { GetCampaignSocialDataUseCase } from "@application/use-cases/metrics/get-campaign-social-data/get-campaign-social-data";
import {
  CampaignSocialDataResponse,
  GetCampaignSocialDataResponses
} from "@application/dtos/metrics/campaign-social-data";

@ApiTags("Metrics")
@Controller("metrics")
export class MetricsController {
  constructor(
    private readonly getMetricsUseCase: GetMetricsUseCase,
    private readonly getCampaignSocialDataUseCase: GetCampaignSocialDataUseCase
  ) {}

  @Get("global")
  @FindGlobalMetricsResponse
  async getMetrics(): Promise<GetMetricsResponseDTO> {
    return await this.getMetricsUseCase.execute();
  }

  @Get("campaigns/:id/social-data")
  @GetCampaignSocialDataResponses
  async getCampaignSocialData(
    @Param("id") id: string
  ): Promise<CampaignSocialDataResponse> {
    return await this.getCampaignSocialDataUseCase.execute(id);
  }
}
