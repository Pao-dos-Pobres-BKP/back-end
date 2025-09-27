import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { GetMetricsUseCase } from "@application/use-cases/metrics/get-metrics/get-metrics";
import { GetMetricsResponseDTO } from "@application/dtos/metrics/get-metrics";

@ApiTags("Metrics")
@Controller("metrics")
export class MetricsController {
  constructor(private readonly getMetricsUseCase: GetMetricsUseCase) {}

  @Get("global")
  @ApiOkResponse({
    type: GetMetricsResponseDTO,
    description: "Retorna métricas globais para o dashboard"
  })
  async getMetrics(): Promise<GetMetricsResponseDTO> {
    return await this.getMetricsUseCase.execute();
  }
}
