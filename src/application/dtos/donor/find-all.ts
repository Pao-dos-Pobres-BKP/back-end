import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";
import { PaginationEntityDTO } from "../utils/pagination";
import { DonorDetails } from "./find-by-id";
import { applyDecorators } from "@nestjs/common";

export class FindAllDonorsResponse extends PaginationEntityDTO {
  @ApiProperty({
    description: "Donors",
    type: [DonorDetails]
  })
  data: DonorDetails[];
}

export const FindAllDonorsResponses = applyDecorators(
  ApiOkResponse({
    description: "All donors",
    type: FindAllDonorsResponse
  })
);
