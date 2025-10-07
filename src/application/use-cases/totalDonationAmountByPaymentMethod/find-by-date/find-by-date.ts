import {
  FindTotalDonationAmountByPaymentMethodAndDateDTO,
  FindTotalDonationAmountByPaymentMethodAndDateResponse
} from "@application/dtos/totalDonationAmountByPaymentMethod/find-by-date";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { TotalDonationAmountByPaymentMethodRepository } from "@domain/repositories/totalDonationAmountByPaymentMethod";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindTotalDonationAmountByPaymentMethodAndDateUseCase {
  constructor(
    private readonly totalDonationAmountByPaymentMethodAndDateRepository: TotalDonationAmountByPaymentMethodRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute({
    startDate,
    endDate
  }: FindTotalDonationAmountByPaymentMethodAndDateDTO): Promise<FindTotalDonationAmountByPaymentMethodAndDateResponse> {
    const totalDonationAmountByPaymentMethodAndDate =
      await this.totalDonationAmountByPaymentMethodAndDateRepository.findByDate(
        startDate,
        endDate
      );

    return {
      rangeDate: totalDonationAmountByPaymentMethodAndDate.rangeDate,
      data: totalDonationAmountByPaymentMethodAndDate.totalDonationAmountByPaymentMethodAmount
    };
  }
}
