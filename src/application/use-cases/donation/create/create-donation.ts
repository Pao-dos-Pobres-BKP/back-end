import { CreateDonationDTO } from "@application/dtos/donation/create";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { DonationRepository } from "@domain/repositories/donation";
import { Injectable } from "@nestjs/common";
import { DonorRepository } from "@domain/repositories/donor";
import {
  PaymentStatus,
  Periodicity,
  PaymentMethod,
  Payment,
  Prisma
} from "@prisma/client";

@Injectable()
export class CreateDonationUseCase {
  constructor(
    private readonly donationRepository: DonationRepository,
    private readonly donorRepository: DonorRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute(dto: CreateDonationDTO, donorId?: string): Promise<void> {
    const { amount, periodicity, campaignId, paymentMethod } = dto;
    if (amount <= 0) {
      return this.exceptionService.badRequest({
        message: "Donation amount must be greater than zero"
      });
    }

    let donor = null;
    if (donorId) {
      donor = await this.donorRepository.findById(donorId);
      if (!donor) {
        return this.exceptionService.notFound({
          message: "Donor not found"
        });
      }
    }

    const now = new Date();

    const paymentsToCreate: Pick<
      Payment,
      "paymentMethod" | "amount" | "status" | "paidAt"
    >[] = [
      {
        paymentMethod: paymentMethod ?? PaymentMethod.PIX,
        amount: new Prisma.Decimal(amount),
        status: PaymentStatus.CONFIRMED,
        paidAt: now
      }
    ];

    if (periodicity) {
      paymentsToCreate.push({
        paymentMethod: paymentMethod ?? PaymentMethod.PIX,
        amount: new Prisma.Decimal(amount),
        status: PaymentStatus.PENDING,
        paidAt: this.calculateNextPaymentDate(now, periodicity)
      });
    }

    await this.donationRepository.create({
      amount,
      periodicity,
      campaignId,
      donorId,
      payments: paymentsToCreate
    });
  }

  private calculateNextPaymentDate(date: Date, periodicity: Periodicity): Date {
    const next = new Date(date);
    switch (periodicity) {
      case Periodicity.MONTHLY:
        next.setMonth(next.getMonth() + 1);
        break;
      case Periodicity.QUARTERLY:
        next.setMonth(next.getMonth() + 3);
        break;
      case Periodicity.SEMI_ANNUAL:
        next.setMonth(next.getMonth() + 6);
        break;
      case Periodicity.YEARLY:
        next.setFullYear(next.getFullYear() + 1);
        break;
    }
    return next;
  }
}
