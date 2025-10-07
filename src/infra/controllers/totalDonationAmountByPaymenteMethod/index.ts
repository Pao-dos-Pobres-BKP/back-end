import {
  FindTotalDonationAmountByPaymentMethodAndDateDTO,
  FindTotalDonationAmountByPaymentMethodAndDateResponse,
  FindTotalDonationAmountByPaymentMethodAndDateResponses
} from "@application/dtos/totalDonationAmountByPaymentMethod/find-by-date";
import { FindTotalDonationAmountByPaymentMethodAndDateUseCase } from "@application/use-cases/totalDonationAmountByPaymentMethod/find-by-date/find-by-date";
import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Total Donation Amount By Payment Method")
@Controller("total-donation-amount-by-payment-method")
export class TotalDonationAmountByPaymentMethodController {
  constructor(
    private readonly findTotalDonationAmountByPaymentMethodAndDateUseCase: FindTotalDonationAmountByPaymentMethodAndDateUseCase
  ) {}

  @Get()
  @FindTotalDonationAmountByPaymentMethodAndDateResponses
  async findTotalDonationAmountByPaymentMethodAndDate(
    @Query() query: FindTotalDonationAmountByPaymentMethodAndDateDTO
  ): Promise<FindTotalDonationAmountByPaymentMethodAndDateResponse> {
    return await this.findTotalDonationAmountByPaymentMethodAndDateUseCase.execute(
      query
    );
  }
}
