import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infra/config/prisma";
import { MetricsMapper } from "@infra/mappers/prisma/metrics-mapper";
import { PeriodMetricsDTO } from "@application/dtos/metrics/get-metrics";

@Injectable()
export class MetricsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMetrics(days: number): Promise<PeriodMetricsDTO> {
    type RawMetricsQueryResult = {
      total_raised: number;
      recurring_donations: number;
      total_donations: number;
      average_ticket: number;
      new_donors: number;
    };

    const result = await this.prisma.$queryRawUnsafe<RawMetricsQueryResult[]>(`
  SELECT 
    COALESCE(SUM(d."amount"), 0) AS total_raised,
    COUNT(DISTINCT CASE WHEN d."is_recurring" THEN d."id" END) AS recurring_donations,
    COUNT(*) AS total_donations,
    COALESCE(AVG(d."amount"), 0) AS average_ticket,
    (
      SELECT COUNT(*) FROM "Donor"
      WHERE "createdAt" >= NOW() - INTERVAL '${days} days'
    ) AS new_donors
  FROM "Donation" d
  WHERE d."createdAt" >= NOW() - INTERVAL '${days} days'
`);

    const raw = result[0];
    return MetricsMapper.toPeriodMetrics(raw);
  }
}
