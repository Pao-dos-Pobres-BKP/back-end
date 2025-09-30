import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infra/config/prisma";
import { SocialMetricsMapper } from "@infra/mappers/prisma/social-metrics-mapper";
import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";

@Injectable()
export class SocialMetricsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getSocialMetrics(): Promise<GetSocialMetricsResponseDTO> {
    type RawGenderResult = { gender: string | null; count: string | number | null };
    type RawAgeResult = { age_range: string | null; count: string | number | null };

    const genderRows = await this.prisma.$queryRawUnsafe<RawGenderResult[]>(`
      SELECT 
        LOWER(d."gender") AS gender,
        COUNT(*)::int AS count
      FROM "Donor" d
      JOIN "User" u ON u.id = d.id
      WHERE u."deletedAt" IS NULL
        AND EXISTS (
          SELECT 1
          FROM "Donation" dn
          WHERE dn."donorId" = d.id
            AND dn."createdAt" >= NOW() - INTERVAL '365 days'
        )
      GROUP BY d."gender"
    `);

    const ageRows = await this.prisma.$queryRawUnsafe<RawAgeResult[]>(`
      SELECT
        CASE 
          WHEN EXTRACT(YEAR FROM AGE(d."birthDate")) BETWEEN 18 AND 25 THEN '18-25'
          WHEN EXTRACT(YEAR FROM AGE(d."birthDate")) BETWEEN 26 AND 35 THEN '26-35'
          WHEN EXTRACT(YEAR FROM AGE(d."birthDate")) BETWEEN 36 AND 50 THEN '36-50'
          WHEN EXTRACT(YEAR FROM AGE(d."birthDate")) > 50 THEN '50+'
        END AS age_range,
        COUNT(*)::int AS count
      FROM "Donor" d
      JOIN "User" u ON u.id = d.id
      WHERE u."deletedAt" IS NULL
        AND EXISTS (
          SELECT 1
          FROM "Donation" dn
          WHERE dn."donorId" = d.id
            AND dn."createdAt" >= NOW() - INTERVAL '365 days'
        )
      GROUP BY age_range
      ORDER BY age_range
    `);

    return SocialMetricsMapper.toResponse(genderRows, ageRows);
  }
}
