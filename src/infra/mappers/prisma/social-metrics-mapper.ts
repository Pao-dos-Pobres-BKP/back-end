import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";

type RawGender = {
  gender: string | null;
  count: string | number | null;
};

type RawAge = {
  age_range: string | null;
  count: string | number | null;
};

export class SocialMetricsMapper {
  static toResponse(
    genderRows: RawGender[],
    ageRows: RawAge[]
  ): GetSocialMetricsResponseDTO {
    return {
      genderDistribution: genderRows.map((g) => ({
        gender: g.gender ?? "other",
        count: Number(g.count) || 0
      })),
      ageDistribution: ageRows.map((a) => ({
        ageRange: a.age_range ?? "unknown",
        count: Number(a.count) || 0
      }))
    };
  }
}
