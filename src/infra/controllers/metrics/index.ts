import { Controller, Get, Param, Query } from "@nestjs/common";
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiQuery
} from "@nestjs/swagger";

import { GetMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-metrics";
import { GetCampaignSocialDataUseCase } from "@application/use-cases/metrics/get-campaign-social-data/get-campaign-social-data";
import { GetSocialMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-social-metrics";

import { GetMetricsResponseDTO } from "@application/dtos/metrics/get-metrics";
import { CampaignSocialDataResponse } from "@application/dtos/metrics/campaign-social-data";
import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";

@ApiTags("Metrics")
@Controller("metrics")
export class MetricsController {
  constructor(
    private readonly getMetricsUseCase: GetMetricsUseCase,
    private readonly getCampaignSocialDataUseCase: GetCampaignSocialDataUseCase,
    private readonly getSocialMetricsUseCase: GetSocialMetricsUseCase
  ) {}

  @Get("global")
  @ApiOkResponse({
    type: GetMetricsResponseDTO,
    description: "Retorna métricas globais para o dashboard"
  })
  @ApiBadRequestResponse({
    description: "Parâmetros inválidos ou requisição mal formatada"
  })
  @ApiInternalServerErrorResponse({
    description: "Erro interno ao buscar métricas globais"
  })
  async getMetrics(): Promise<GetMetricsResponseDTO> {
    return await this.getMetricsUseCase.execute();
  }

  @Get("campaigns/:id/social-data")
  @ApiOkResponse({
    type: CampaignSocialDataResponse,
    description: "Retorna dados sociais (gênero, idade) de uma campanha específica"
  })
  @ApiBadRequestResponse({
    description: "O ID da campanha é inválido ou ausente"
  })
  @ApiInternalServerErrorResponse({
    description: "Erro interno ao buscar dados sociais da campanha"
  })
  async getCampaignSocialData(
    @Param("id") id: string
  ): Promise<CampaignSocialDataResponse> {
    return await this.getCampaignSocialDataUseCase.execute(id);
  }

 @Get("social-distribution")
@ApiQuery({
  name: "startDate",
  required: true,
  example: "2024-01-01",
  description: "Data inicial do intervalo (formato ISO: YYYY-MM-DD)"
})
@ApiQuery({
  name: "endDate",
  required: true,
  example: "2024-12-31",
  description: "Data final do intervalo (formato ISO: YYYY-MM-DD)"
})
@ApiOkResponse({
  type: GetSocialMetricsResponseDTO,
  description: "Retorna distribuição de doadores por gênero e faixa etária no período informado"
})
@ApiInternalServerErrorResponse({
  description: "Erro interno ao buscar distribuição social"
})
async getSocialMetrics(
  @Query("startDate") startDate: string,
  @Query("endDate") endDate: string
): Promise<GetSocialMetricsResponseDTO> {
  return await this.getSocialMetricsUseCase.execute(
    new Date(startDate),
    new Date(endDate)
  );
}
}