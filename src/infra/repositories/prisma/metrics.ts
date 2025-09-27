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
      total_raised: Prisma.Decimal;
      recurring_donations: number;
      total_donations: number;
      average_ticket: Prisma.Decimal;
      new_donors: number;
    };

    const result = await this.prisma.$queryRaw<RawMetricsQueryResult[]>(
      Prisma.sql`
          SELECT
            COALESCE(SUM(d."amount"), 0) AS total_raised,
            COUNT(DISTINCT CASE WHEN d."periodicity" IS NOT NULL THEN d."id" END) AS recurring_donations,
            COUNT(*) AS total_donations,
            COALESCE(AVG(d."amount"), 0) AS average_ticket,
            (
              SELECT COUNT(DISTINCT don.id)
              FROM "Donor" don
              JOIN "Donation" d2 ON don.id = d2."donorId"
              JOIN "Payment" p2 ON d2.id = p2."donationId"
              WHERE don."createdAt" >= NOW() - INTERVAL ${days}::text || ' days'
                AND d2."createdAt" >= NOW() - INTERVAL ${days}::text || ' days'
                AND p2."status" IN ('CONFIRMED', 'AUTHORIZED')
            ) AS new_donors
          FROM "Donation" d
          JOIN "Payment" p ON d.id = p."donationId"
          WHERE d."createdAt" >= NOW() - INTERVAL ${days}::text || ' days'
            AND p."status" IN ('CONFIRMED', 'AUTHORIZED')
            AND d."donorId" IS NOT NULL
      `
    );

    const raw = result[0];

    if (!raw) {
      throw new Error("Query retornou resultado vazio");
    }

    return {
      total_raised: Number(raw.total_raised),
      recurring_donations: raw.recurring_donations,
      total_donations: raw.total_donations,
      average_ticket: Number(raw.average_ticket),
      new_donors: raw.new_donors
    };
  }
}
