import { FindAllDonationsResponse } from "@application/dtos/donation/find-all";
import { PaginationDTO } from "@application/dtos/utils/pagination";
import { DonationRepository } from "@domain/repositories/donation";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllDonationsUseCase {
  constructor(private readonly donationRepository: DonationRepository) {}

  async execute({
    donorId,
    page,
    pageSize
  }: PaginationDTO & { donorId: string }): Promise<FindAllDonationsResponse> {
    return await this.donationRepository.findAllByDonor(donorId, {
      page,
      pageSize
    });
  }
}
