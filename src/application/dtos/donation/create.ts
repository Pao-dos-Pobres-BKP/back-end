import { applyDecorators } from "@nestjs/common";
import { ApiCreatedResponse, ApiProperty } from "@nestjs/swagger";
import { Min } from "class-validator";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum
} from "class-validator";
import { Periodicity } from "@domain/entities/periodicity-enum";
import { PaymentMethod } from "@prisma/client";

export class CreateDonationDTO {
  @ApiProperty({
    description: "Donation amount",
    example: 100.0
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1.0)
  amount: number;

  @ApiProperty({
    description: "Donation periodicity (e.g., monthly)",
    example: Periodicity.MONTHLY,
    required: false
  })
  @IsString()
  @IsOptional()
  periodicity?: Periodicity;

  @ApiProperty({
    description: "Campaign ID (optional)",
    example: "campaign123",
    required: false
  })
  @IsString()
  @IsOptional()
  campaignId?: string;

  @ApiProperty({
    description: "Payment method",
    enum: PaymentMethod,
    example: PaymentMethod.PIX,
    required: false
  })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod: PaymentMethod;
}

export const CreateDonationResponses = applyDecorators(
  ApiCreatedResponse({
    description: "Donation created successfully"
  })
);
