import { Injectable } from "@nestjs/common";
import { DonationRepository } from "@domain/repositories/donation";
import { ExceptionsAdapter } from "@domain/adapters/exception";

@Injectable()
export class DeleteDonationUseCase {
  constructor(
    private readonly donationRepository: DonationRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute(donationId: string, donorId?: string): Promise<void> {
    const donation = await this.donationRepository.findById(donationId);

    if (!donation) {
      this.exceptionService.notFound({ message: "Donation not found" });
      return;
    }

    if (donation.donorId !== donorId) {
      this.exceptionService.forbidden({
        message: "You can only delete your own donations"
      });
      return;
    }

    if (donation.periodicity) {
      const recurringDonations = await this.donationRepository.findAllByDonor(
        donorId,
        { page: 1, pageSize: 1000 }
      );
      const toDelete = recurringDonations.data.filter(
        (d) => d.periodicity === donation.periodicity
      );

      await Promise.all(
        toDelete.map((d) => this.donationRepository.delete(d.id))
      );
    } else {
      return this.exceptionService.badRequest({
        message: "Donation is not recurring"
      });
    }
  }
}
