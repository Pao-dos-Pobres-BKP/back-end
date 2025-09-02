import { UpdateDonationDTO } from "@application/dtos/donation/update";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { DonationRepository } from "@domain/repositories/donation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateDonationUseCase {
  constructor(
    private readonly donationRepository: DonationRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute(
    id: string,
    donorId: string,
    params: UpdateDonationDTO
  ): Promise<void> {
    const donation = await this.donationRepository.findById(id);

    if (!donation) {
      return this.exceptionService.notFound({
        message: "Donation not found"
      });
    }

    if (donation.donorId !== donorId) {
      return this.exceptionService.forbidden({
        message: "You can only update your own donations"
      });
    }

    if (params.amount !== undefined && params.amount <= 0) {
      return this.exceptionService.badRequest({
        message: "Donation amount must be greater than zero"
      });
    }

    await this.donationRepository.update(id, {
      ...params
    });
  }
}
