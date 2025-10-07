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
import { Prisma, PaymentMethod } from "@prisma/client";
import { TotalDonationAmountByPaymentMethodResponse } from "@domain/repositories/metrics";

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

  async findByDateDonationByPaymentMethod(
    startDate: Date,
    endDate: Date
  ): Promise<TotalDonationAmountByPaymentMethodResponse> {
    const totalDonationAmountByPaymentMethod = await this.prisma.$queryRaw<
      Array<{
        paymentMethod: string;
        totalAmount: number;
        totalQuantity: number;
      }>
    >(
      Prisma.sql`
        SELECT 
          payment_method as "paymentMethod",
          COALESCE(SUM(amount), 0)::FLOAT as "totalAmount",
          COUNT(id)::INTEGER as "totalQuantity"
        FROM payments 
        WHERE paid_at >= ${startDate}
          AND paid_at <= ${endDate}
          AND status = 'CONFIRMED'
        GROUP BY payment_method
      `
    );

    const formattedData = totalDonationAmountByPaymentMethod.map((item) => ({
      paymentMethod: item.paymentMethod as PaymentMethod,
      totalAmount: Number(item.totalAmount || 0),
      totalQuantity: item.totalQuantity
    }));

    return {
      rangeDate: {
        startDate,
        endDate
      },
      totalDonationAmountByPaymentMethodAmount: formattedData
    };
  }
}
