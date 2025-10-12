import { applyDecorators } from "@nestjs/common";
import {
  ApiQuery,
  ApiOkResponse,
  ApiInternalServerErrorResponse
} from "@nestjs/swagger";
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
export const GetSocialMetricsResponses = applyDecorators(
  ApiQuery({
    name: "startDate",
    required: true,
    example: "2024-01-01",
    description: "Data inicial do intervalo (formato ISO: YYYY-MM-DD)"
  }),
  ApiQuery({
    name: "endDate",
    required: true,
    example: "2024-12-31",
    description: "Data final do intervalo (formato ISO: YYYY-MM-DD)"
  }),
  ApiOkResponse({
    type: GetSocialMetricsResponseDTO,
    description:
      "Retorna distribuição de doadores por gênero e faixa etária no período informado"
  }),
  ApiInternalServerErrorResponse({
    description: "Erro interno ao buscar distribuição social"
  })
);
