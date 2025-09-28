import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infra/config/prisma";
import {
  GetMetricsResponseDTO,
  PeriodMetricsDTO
} from "@application/dtos/metrics/get-metrics";
import { Prisma } from "@prisma/client";

@Injectable()
export class MetricsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getMetrics(): Promise<GetMetricsResponseDTO> {
    const [last_30_days, last_365_days] = await Promise.all([
      this.getMetricsByPeriod(30),
      this.getMetricsByPeriod(365)
    ]);

    return { last_30_days, last_365_days };
  }

  private async getMetricsByPeriod(days: number): Promise<PeriodMetricsDTO> {
    type RawMetricsQueryResult = {
      total_raised: Prisma.Decimal | string | number;
      recurring_donations: number;
      total_donations: number;
      average_ticket: Prisma.Decimal | string | number;
      new_donors: number;
    };

    const result = await this.prisma.$queryRaw<RawMetricsQueryResult[]>(
      Prisma.sql`
        SELECT
          COALESCE(SUM(p.amount)::numeric, 0) AS total_raised,
          COUNT(DISTINCT CASE WHEN d.periodicity IS NOT NULL THEN d.id END)::int AS recurring_donations,
          COUNT(DISTINCT d.id)::int AS total_donations,
          COALESCE(AVG(p.amount)::numeric, 0) AS average_ticket,
          (
            SELECT COUNT(DISTINCT u.id)::int
            FROM users u
            JOIN donors don ON don.id = u.id
            JOIN donations d2 ON don.id = d2.donor_id
            JOIN payments p2 ON d2.id = p2.donation_id
            WHERE u.created_at >= NOW() - INTERVAL '1 day' * ${days}
              AND d2.created_at >= NOW() - INTERVAL '1 day' * ${days}
              AND p2.status = 'CONFIRMED'
          ) AS new_donors
        FROM donations d
        JOIN payments p ON d.id = p.donation_id
        WHERE d.created_at >= NOW() - INTERVAL '1 day' * ${days}
          AND p.status = 'CONFIRMED' AND 'AUTHORIZED'
          AND d.donor_id IS NOT NULL
      `
    );

    const raw = result[0];

    return {
      total_raised: Number(raw.total_raised),
      recurring_donations: Number(raw.recurring_donations),
      total_donations: Number(raw.total_donations),
      average_ticket: Number(raw.average_ticket),
      new_donors: Number(raw.new_donors)
    };
  }
}
