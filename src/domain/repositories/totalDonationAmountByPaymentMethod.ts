import {
  rangeDatePaymentMethodAmount,
  totalDonationAmountByPaymentMethodAmount
} from "@application/dtos/totalDonationAmountByPaymentMethod/find-by-date";

export interface TotalDonationAmountByPaymentMethodResponse {
  rangeDate: rangeDatePaymentMethodAmount;
  totalDonationAmountByPaymentMethodAmount: totalDonationAmountByPaymentMethodAmount[];
}

export abstract class TotalDonationAmountByPaymentMethodRepository {
  abstract findByDate(
    startDate: Date,
    endDate: Date
  ): Promise<TotalDonationAmountByPaymentMethodResponse>;
}
