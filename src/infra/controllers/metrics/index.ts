import { Controller, Get, Param, Query } from "@nestjs/common";
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
import { GetDonationsRaisedByPeriodUseCase } from "@application/use-cases/metrics/get-donations-raised-by-period/get-donations-raised-by-period";
import {
  DonationsRaisedByPeriodResponse,
  GetDonationsRaisedByPeriodDTO,
  GetDonationsRaisedByPeriodResponses
} from "@application/dtos/metrics/get-donations-raised-by-period";

@ApiTags("Metrics")
@Controller("metrics")
export class MetricsController {
  constructor(
    private readonly getMetricsUseCase: GetMetricsUseCase,
    private readonly getCampaignSocialDataUseCase: GetCampaignSocialDataUseCase,
    private readonly getDonationByPaymentMethodAndDateUseCase: GetDonationByPaymentMethodAndDateUseCase,
    private readonly getDonationsRaisedByPeriodUseCase: GetDonationsRaisedByPeriodUseCase
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

  @Get("donations/raised-by-period")
  @GetDonationsRaisedByPeriodResponses
  async getDonationsRaisedByPeriod(
    @Query() query: GetDonationsRaisedByPeriodDTO
  ): Promise<DonationsRaisedByPeriodResponse> {
    return await this.getDonationsRaisedByPeriodUseCase.execute(query);
  }
}
