import { CampaignRepository } from "@domain/repositories/campaign";
import { CampaignRepositoryStub } from "@test/stubs/repositories/campaign";
import { FindCampaignByDonorIdUseCase } from ".";
import { createMockCampaign } from "@test/builders/campaign";

describe("FindCampaignByDonorIdUseCase", () => {
  let sut: FindCampaignByDonorIdUseCase;
  let campaignRepository: CampaignRepository;

  beforeEach(() => {
    campaignRepository = new CampaignRepositoryStub();
    sut = new FindCampaignByDonorIdUseCase(campaignRepository);
  });

  it("should return campaigns paginated for the donor", async () => {
    const donorId = "donor-id";
    const page = 1;
    const pageSize = 10;

    const mockCampaign = [createMockCampaign(), createMockCampaign()];

    jest.spyOn(campaignRepository, "findByDonorId").mockResolvedValue({
      data: mockCampaign,
      page: 1,
      lastPage: 1,
      total: 0
    });

    const result = await sut.execute(donorId, { page, pageSize });

    expect(campaignRepository.findByDonorId).toHaveBeenCalledWith(donorId, {
      page,
      pageSize
    });

    expect(result).toEqual({
      data: mockCampaign,
      page: 1,
      lastPage: 1,
      total: 0
    });
  });
});
