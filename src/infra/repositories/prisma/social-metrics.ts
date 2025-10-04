import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infra/config/prisma";
import { SocialMetricsMapper } from "@infra/mappers/prisma/social-metrics-mapper";
import { GetSocialMetricsResponseDTO } from "@application/dtos/metrics/get-social-metrics";

@Injectable()
export class SocialMetricsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getSocialMetrics(days: number): Promise<GetSocialMetricsResponseDTO> {
    type RawGenderResult = { gender: string | null; count: string | number | null };
    type RawAgeResult = { age_range: string | null; count: string | number | null };

    const genderRows = await this.prisma.$queryRawUnsafe<RawGenderResult[]>(`
      SELECT 
        d.gender::text AS gender,  
        COUNT(*)::int AS count
      FROM donors d
      JOIN users u ON u.id = d.id
      WHERE u.deleted_at IS NULL
        AND EXISTS (
          SELECT 1
          FROM donations dn
          WHERE dn.donor_id = d.id
            AND dn.created_at >= NOW() - INTERVAL '${days} days'
        )
      GROUP BY d.gender
    `);

    const ageRows = await this.prisma.$queryRawUnsafe<RawAgeResult[]>(`
      SELECT
        CASE 
          WHEN EXTRACT(YEAR FROM AGE(d.birth_date)) BETWEEN 18 AND 25 THEN '18-25'
          WHEN EXTRACT(YEAR FROM AGE(d.birth_date)) BETWEEN 26 AND 35 THEN '26-35'
          WHEN EXTRACT(YEAR FROM AGE(d.birth_date)) BETWEEN 36 AND 50 THEN '36-50'
          WHEN EXTRACT(YEAR FROM AGE(d.birth_date)) > 50 THEN '50+'
        END AS age_range,
        COUNT(*)::int AS count
      FROM donors d
      JOIN users u ON u.id = d.id
      WHERE u.deleted_at IS NULL
        AND EXISTS (
          SELECT 1
          FROM donations dn
          WHERE dn.donor_id = d.id
            AND dn.created_at >= NOW() - INTERVAL '${days} days'
        )
      GROUP BY age_range
      ORDER BY age_range
    `);

    return SocialMetricsMapper.toResponse(genderRows, ageRows);
  }
}
