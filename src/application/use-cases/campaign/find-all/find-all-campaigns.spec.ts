import { CampaignRepository } from "@domain/repositories/campaign";
import { CampaignRepositoryStub } from "@test/stubs/repositories/campaign";
import { FindAllCampaignsUseCase } from "./find-all-campaigns";
import { PaginatedEntity } from "@domain/constants/pagination";
import { CampaignDetailsResponse } from "@domain/repositories/campaign";
import { CampaignStatus } from "@prisma/client";

describe("FindAllCampaignsUseCase", () => {
  let sut: FindAllCampaignsUseCase;
  let campaignRepository: CampaignRepository;

  beforeEach(() => {
    campaignRepository = new CampaignRepositoryStub();
    sut = new FindAllCampaignsUseCase(campaignRepository);
  });

  it("should return paginated campaigns with default pagination", async () => {
    const mockResponse: PaginatedEntity<CampaignDetailsResponse> = {
      data: [
        {
          id: "1",
          title: "Campaign 1",
          description: "Description 1",
          targetAmount: 1000,
          currentAmount: 500,
          achievementPercentage: 50,
          startDate: new Date(),
          endDate: new Date(),
          imageUrl: "http://example.com/image1.jpg",
          status: CampaignStatus.ACTIVE,
          createdBy: "user-1"
        },
        {
          id: "2",
          title: "Campaign 2",
          description: "Description 2",
          targetAmount: 2000,
          currentAmount: 1000,
          achievementPercentage: 50,
          startDate: new Date(),
          endDate: new Date(),
          imageUrl: "http://example.com/image2.jpg",
          status: CampaignStatus.ACTIVE,
          createdBy: "user-2"
        }
      ],
      total: 2,
      page: 1,
      lastPage: 1
    };

    jest.spyOn(campaignRepository, "findAll").mockResolvedValue(mockResponse);

    const result = await sut.execute({ page: 1, pageSize: 10 });

    expect(campaignRepository.findAll).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10
    });
    expect(result).toEqual(mockResponse);
  });

  it("should return paginated campaigns with custom pagination", async () => {
    const mockResponse: PaginatedEntity<CampaignDetailsResponse> = {
      data: [],
      total: 0,
      page: 2,
      lastPage: 0
    };

    jest.spyOn(campaignRepository, "findAll").mockResolvedValue(mockResponse);

    const result = await sut.execute({ page: 2, pageSize: 5 });

    expect(campaignRepository.findAll).toHaveBeenCalledWith({
      page: 2,
      pageSize: 5
    });
    expect(result).toEqual(mockResponse);
  });

  it("should handle empty campaigns list", async () => {
    const mockResponse: PaginatedEntity<CampaignDetailsResponse> = {
      data: [],
      total: 0,
      page: 1,
      lastPage: 0
    };

    jest.spyOn(campaignRepository, "findAll").mockResolvedValue(mockResponse);

    const result = await sut.execute({ page: 1, pageSize: 10 });

    expect(result.data).toHaveLength(0);
    expect(result.total).toBe(0);
  });
});
