import { GetSocialMetricsUseCase } from "./get-social-metrics";
import { SocialMetricsRepository } from "@domain/repositories/social-metrics";
import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";

describe("GetSocialMetricsUseCase", () => {
  let getSocialMetricsUseCase: GetSocialMetricsUseCase;
  let socialMetricsRepository: SocialMetricsRepository;

  const mockResponse: GetSocialMetricsResponseDTO = {
    genderDistribution: [
      { gender: "male", count: 120 },
      { gender: "female", count: 150 },
      { gender: "other", count: 10 }
    ],
    ageDistribution: [
      { ageRange: "18-25", count: 50 },
      { ageRange: "26-35", count: 80 },
      { ageRange: "36-50", count: 90 },
      { ageRange: "50+", count: 60 }
    ]
  };

  beforeEach(() => {
    socialMetricsRepository = {
      getSocialMetrics: jest.fn().mockResolvedValue(mockResponse)
    } as unknown as SocialMetricsRepository;

    getSocialMetricsUseCase = new GetSocialMetricsUseCase(
      socialMetricsRepository
    );
  });

  it("should return social metrics (gender and age distributions)", async () => {
    const result = await getSocialMetricsUseCase.execute();

    expect(result).toEqual(mockResponse);
    expect(socialMetricsRepository.getSocialMetrics).toHaveBeenCalledTimes(1);
  });
});
