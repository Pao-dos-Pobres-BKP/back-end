import { FindAllCampaignsResponse } from "@application/dtos/campaign/find-all";
import { PaginationDTO } from "@application/dtos/utils/pagination";
import { CampaignRepository } from "@domain/repositories/campaign";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllCampaignsUseCase {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  async execute({
    page,
    pageSize
  }: PaginationDTO): Promise<FindAllCampaignsResponse> {
    return await this.campaignRepository.findAll({
      page,
      pageSize
    });
  }
}
