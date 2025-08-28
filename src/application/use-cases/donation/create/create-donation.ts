import { CreateDonationDTO } from "@application/dtos/donation/create";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { DonationRepository } from "@domain/repositories/donation";
import { Injectable } from "@nestjs/common";
//import { Donation } from "@domain/entities/donation";

@Injectable()
export class CreateDonationUseCase {
  constructor(
    private readonly donationRepository: DonationRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute(
    { amount, periodicity, impactArea, campaignId }: CreateDonationDTO,
    donorId: string
  ): Promise<void> {
    if (amount <= 0) {
      return this.exceptionService.badRequest({
        message: "Donation amount must be greater than zero"
      });
    }

    await this.donationRepository.create({
      amount,
      periodicity,
      impactArea,
      campaignId,
      donorId
    });
  }
}
