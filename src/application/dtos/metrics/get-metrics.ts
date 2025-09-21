import { ApiProperty } from "@nestjs/swagger";

export interface GetMetricsRequestDTO {
  periodInDays: number;
}

export class PeriodMetricsDTO {
  @ApiProperty()
  total_raised: number;

  @ApiProperty()
  new_donors: number;

  @ApiProperty()
  recurring_donations: number;

  @ApiProperty()
  total_donations: number;

  @ApiProperty()
  average_ticket: number;
}

export class GetMetricsResponseDTO {
  @ApiProperty({ type: PeriodMetricsDTO })
  last_30_days: PeriodMetricsDTO;

  @ApiProperty({ type: PeriodMetricsDTO })
  last_365_days: PeriodMetricsDTO;
}
