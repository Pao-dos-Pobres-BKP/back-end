import { MetricsRepository } from "@domain/repositories/metrics";
import {
  GetMetricsResponseDTO,
  PeriodMetricsDTO
} from "@application/dtos/metrics/get-metrics";
import {
  DonorStatisticsData,
  TotalDonationAmountByPaymentMethodResponse
} from "@domain/repositories/metrics";
import { Gender } from "@domain/entities/gender-enum";
import { PaymentMethod } from "@prisma/client";

export class MetricsRepositoryStub implements MetricsRepository {
  async getMetrics(): Promise<GetMetricsResponseDTO> {
    const mockPeriodData: PeriodMetricsDTO = {
      total_raised: 50000,
      new_donors: 120,
      recurring_donations: 25,
      total_donations: 300,
      average_ticket: 166.67
    };

    return {
      last_30_days: {
        total_raised: 3000,
        new_donors: 10,
        recurring_donations: 3,
        total_donations: 15,
        average_ticket: 200
      },
      last_365_days: mockPeriodData
    };
  }

  async getCampaignDonorsStatistics(
    campaignId: string
  ): Promise<DonorStatisticsData[]> {
    if (campaignId === "empty-campaign") {
      return [];
    }
    return [
      {
        id: "donor-1",
        fullName: "João Silva",
        gender: Gender.MALE,
        birthDate: new Date("1990-05-15")
      },
      {
        id: "donor-2",
        fullName: "Maria Santos",
        gender: Gender.FEMALE,
        birthDate: new Date("1985-08-22")
      },
      {
        id: "donor-3",
        fullName: "Carlos Oliveira",
        gender: Gender.MALE,
        birthDate: new Date("1995-12-10")
      }
    ];
  }

  async findByDateDonationByPaymentMethod(
    startDate: Date,
    endDate: Date
  ): Promise<TotalDonationAmountByPaymentMethodResponse> {
    return {
      rangeDate: {
        startDate,
        endDate
      },
      totalDonationAmountByPaymentMethodAmount: [
        {
          paymentMethod: PaymentMethod.PIX,
          totalAmount: 5000,
          totalQuantity: 25
        },
        {
          paymentMethod: PaymentMethod.CREDIT_CARD,
          totalAmount: 10000,
          totalQuantity: 15
        },
        {
          paymentMethod: PaymentMethod.BANK_SLIP,
          totalAmount: 3000,
          totalQuantity: 10
        }
      ]
    };
  }
}
