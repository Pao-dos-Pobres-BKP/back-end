import { PaginatedEntity } from "@domain/constants/pagination";
import { Campaign } from "@prisma/client";
import {
  CampaignRepository,
  CampaignDetailsResponse,
  DonorSocialDataResponse
} from "@domain/repositories/campaign";

export class CampaignRepositoryStub implements CampaignRepository {
  async create(): Promise<void> {
    return;
  }

  async findById(): Promise<Campaign | null> {
    return;
  }

  async findByTitleAndDateAndStatus(): Promise<
    PaginatedEntity<CampaignDetailsResponse>
  > {
    return;
  }

  async update(): Promise<void> {
    return;
  }

  async delete(): Promise<void> {
    return;
  }

  async findDonorsSocialDataByCampaign(): Promise<DonorSocialDataResponse[]> {
    return;
  }
}
