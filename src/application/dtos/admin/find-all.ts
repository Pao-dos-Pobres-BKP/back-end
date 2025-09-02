import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";
import { PaginationEntityDTO } from "../utils/pagination";
import { applyDecorators } from "@nestjs/common";
import { AdminDetails } from "./find-by-id";

export class FindAllAdminsResponse extends PaginationEntityDTO {
  @ApiProperty({
    description: "Admins",
    type: [AdminDetails]
  })
  data: AdminDetails[];
}

export const FindAllAdminsResponses = applyDecorators(
  ApiOkResponse({
    description: "All admins",
    type: FindAllAdminsResponse
  })
);
