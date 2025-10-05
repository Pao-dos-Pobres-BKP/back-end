import { ApiProperty } from "@nestjs/swagger";

export class GenderDistributionDTO {
  @ApiProperty({ example: "male" })
  gender: string;

  @ApiProperty({ example: 120 })
  count: number;
}

export class AgeDistributionDTO {
  @ApiProperty({ example: "18-25" })
  ageRange: string;

  @ApiProperty({ example: 50 })
  count: number;
}

export class GetSocialMetricsResponseDTO {
  @ApiProperty({ type: [GenderDistributionDTO] })
  genderDistribution: GenderDistributionDTO[];

  @ApiProperty({ type: [AgeDistributionDTO] })
  ageDistribution: AgeDistributionDTO[];
}
