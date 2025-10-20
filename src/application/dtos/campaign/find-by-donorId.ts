import { PaginatedEntity } from "@domain/constants/pagination";
import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Campaign } from "@prisma/client";

export const FindCampaignByDonorIdResponses = applyDecorators(
  ApiOkResponse({
    description: "Campaigns found successfully",
    type: PaginatedEntity<Campaign>
  }),
  ApiOperation({ summary: "Find campaigns by donor ID" })
);
