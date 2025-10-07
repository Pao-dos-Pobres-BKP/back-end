import {
  TotalDonationAmountByPaymentMethodRepository,
  TotalDonationAmountByPaymentMethodResponse
} from "@domain/repositories/totalDonationAmountByPaymentMethod";
import { PrismaService } from "@infra/config/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaTotalDonationAmountByPaymentMethodRepository
  implements TotalDonationAmountByPaymentMethodRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findByDate(
    startDate: Date,
    endDate: Date
  ): Promise<TotalDonationAmountByPaymentMethodResponse> {
    const totalDonationAmountByPaymentMethod =
      await this.prisma.payment.groupBy({
        by: ["paymentMethod"],
        where: {
          paidAt: {
            gte: startDate,
            lte: endDate
          },
          status: "CONFIRMED"
        },
        _sum: {
          amount: true
        },
        _count: {
          id: true
        }
      });

    const formattedData = totalDonationAmountByPaymentMethod.map((item) => ({
      paymentMethod: item.paymentMethod,
      totalAmount: Number(item._sum.amount || 0),
      totalQuantity: item._count.id
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
