import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query
} from "@nestjs/common";
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
import {
  DonationByPaymentMethodAndDateResponse,
  GetDonationByPaymentMethodAndDateDTO,
  GetDonationByPaymentMethodAndDateResponses
} from "@application/dtos/metrics/get-donation-by-payment-method";
import { GetDonationByPaymentMethodAndDateUseCase } from "@application/use-cases/metrics/get-donation-by-payment-method/get-donation-by-payment-method";
import { UserRole } from "@domain/entities/user-role-enum";
import { RequireToken } from "@infra/commons/decorators/require-token";
import {
  CampaignMetricsUseCase,
  CampaignWithMetrics
} from "@application/use-cases/metrics/campaign-metrics/campaign-metrics";
import { CampaignPaymentMetricsResponses } from "@application/dtos/metrics/campaign-metrics";

@ApiTags("Metrics")
@Controller("metrics")
export class MetricsController {
  constructor(
    private readonly getMetricsUseCase: GetMetricsUseCase,
    private readonly getCampaignSocialDataUseCase: GetCampaignSocialDataUseCase,
    private readonly getDonationByPaymentMethodAndDateUseCase: GetDonationByPaymentMethodAndDateUseCase,
    private readonly comparePaymentMethodsUseCase: CampaignMetricsUseCase
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

  @Get("donation/payment-method")
  @GetDonationByPaymentMethodAndDateResponses
  async getDonationByPaymentMethodAndDate(
    @Query() query: GetDonationByPaymentMethodAndDateDTO
  ): Promise<DonationByPaymentMethodAndDateResponse> {
    return await this.getDonationByPaymentMethodAndDateUseCase.execute(query);
  }

  @HttpCode(HttpStatus.OK)
  @Get("campaigns/:id/metrics")
  @RequireToken([UserRole.ADMIN])
  @CampaignPaymentMetricsResponses
  async comparePaymentMethods(
    @Param("id") id: string
  ): Promise<CampaignWithMetrics | void> {
    return this.comparePaymentMethodsUseCase.execute(id);
  }
}
