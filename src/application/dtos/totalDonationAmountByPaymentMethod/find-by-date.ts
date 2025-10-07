import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiProperty } from "@nestjs/swagger";
import { PaymentMethod } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class FindTotalDonationAmountByPaymentMethodAndDateDTO {
  @ApiProperty({
    description: "Start date",
    type: Date
  })
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: "End date",
    type: Date
  })
  @Type(() => Date)
  @IsDate()
  endDate: Date;
}

export class rangeDatePaymentMethodAmount {
  @ApiProperty({
    description: "Start date",
    type: Date
  })
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: "End date",
    type: Date
  })
  @Type(() => Date)
  @IsDate()
  endDate: Date;
}

export class totalDonationAmountByPaymentMethodAmount {
  @ApiProperty({
    description: "Payment method",
    enum: PaymentMethod
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: "Total amount",
    type: Number
  })
  totalAmount: number;

  @ApiProperty({
    description: "Total quantity",
    type: Number
  })
  totalQuantity: number;
}

export class FindTotalDonationAmountByPaymentMethodAndDateResponse {
  @ApiProperty({
    description: "Range date",
    type: rangeDatePaymentMethodAmount
  })
  rangeDate: rangeDatePaymentMethodAmount;

  @ApiProperty({
    description: "Total donation amount by payment method and date",
    type: totalDonationAmountByPaymentMethodAmount
  })
  data: totalDonationAmountByPaymentMethodAmount[];
}

export const FindTotalDonationAmountByPaymentMethodAndDateResponses =
  applyDecorators(
    ApiOkResponse({
      description: "Total donation amount by date",
      type: FindTotalDonationAmountByPaymentMethodAndDateResponse
    }),
    ApiOperation({ summary: "Find total donation amount by date" })
  );
