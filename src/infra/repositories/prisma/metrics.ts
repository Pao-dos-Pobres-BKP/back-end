import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infra/config/prisma";
import {
  GetMetricsResponseDTO,
  PeriodMetricsDTO
} from "@application/dtos/metrics/get-metrics";
import {
  MetricsRepository as IMetricsRepository,
  DonorStatisticsData
} from "@domain/repositories/metrics";
import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";
import { Prisma } from "@prisma/client";
import { SocialMetricsMapper } from "@infra/mappers/prisma/social-metrics-mapper";

@Injectable()
export class MetricsRepository implements IMetricsRepository {
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
          AND p.status = 'CONFIRMED'
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
  async getSocialMetrics(
    startDate: Date,
    endDate: Date
  ): Promise<GetSocialMetricsResponseDTO> {
    type RawGenderResult = {
      gender: string | null;
      count: string | number | null;
    };
    type RawAgeResult = {
      age_range: string | null;
      count: string | number | null;
    };

    const genderRows = await this.prisma.$queryRawUnsafe<RawGenderResult[]>(`
      SELECT 
        d.gender::text AS gender,
        COUNT(*)::int AS count
      FROM donors d
      JOIN users u ON u.id = d.id
      WHERE u.deleted_at IS NULL
        AND EXISTS (
          SELECT 1
          FROM donations dn
          WHERE dn.donor_id = d.id
            AND dn.created_at BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'
        )
      GROUP BY d.gender
    `);

    const ageRows = await this.prisma.$queryRawUnsafe<RawAgeResult[]>(`
      SELECT
        CASE 
          WHEN EXTRACT(YEAR FROM AGE(d.birth_date)) BETWEEN 18 AND 25 THEN '18-25'
          WHEN EXTRACT(YEAR FROM AGE(d.birth_date)) BETWEEN 26 AND 35 THEN '26-35'
          WHEN EXTRACT(YEAR FROM AGE(d.birth_date)) BETWEEN 36 AND 50 THEN '36-50'
          WHEN EXTRACT(YEAR FROM AGE(d.birth_date)) > 50 THEN '50+'
        END AS age_range,
        COUNT(*)::int AS count
      FROM donors d
      JOIN users u ON u.id = d.id
      WHERE u.deleted_at IS NULL
        AND EXISTS (
          SELECT 1
          FROM donations dn
          WHERE dn.donor_id = d.id
            AND dn.created_at BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'
        )
      GROUP BY age_range
      ORDER BY age_range
    `);

    return SocialMetricsMapper.toResponse(genderRows, ageRows);
  }

  async getCampaignDonorsStatistics(
    campaignId: string
  ): Promise<DonorStatisticsData[]> {
    const donors = await this.prisma.donation.findMany({
      where: {
        campaignId: campaignId,
        donorId: { not: null }
      },
      select: {
        donor: {
          select: {
            id: true,
            user: {
              select: {
                fullName: true,
                deletedAt: true
              }
            },
            birthDate: true,
            gender: true
          }
        }
      },
      distinct: ["donorId"]
    });

    return donors
      .filter((donation) => donation.donor && donation.donor.user)
      .map((donation) => ({
        id: donation.donor!.id,
        fullName: donation.donor!.user.fullName,
        gender: donation.donor!.gender,
        birthDate: donation.donor!.birthDate
      }));
  }
}
