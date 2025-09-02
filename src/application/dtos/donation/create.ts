import { applyDecorators } from "@nestjs/common";
import { ApiCreatedResponse, ApiProperty } from "@nestjs/swagger";
import { Min } from "class-validator";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDonationDTO {
  @ApiProperty({
    description: "Donation amount",
    example: 100.0
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  amount: number;

  @ApiProperty({
    description: "Donation periodicity (e.g., monthly)",
    example: "monthly",
    required: false
  })
  @IsString()
  @IsOptional()
  periodicity?: string;

  @ApiProperty({
    description: "Impact area (optional)",
    example: "Education",
    required: false
  })
  @IsString()
  @IsOptional()
  impactArea?: string;

  @ApiProperty({
    description: "Campaign ID (optional)",
    example: "campaign123",
    required: false
  })
  @IsString()
  @IsOptional()
  campaignId?: string;
}

export const CreateDonationResponses = applyDecorators(
  ApiCreatedResponse({
    description: "Donation created successfully"
  })
);
