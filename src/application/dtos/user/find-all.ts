import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";
import { PaginationEntityDTO } from "../utils/pagination";
import { UserWithoutPassword } from "./create";

export class FindAllUserDTO extends PaginationEntityDTO {
  @ApiProperty({
    description: "User data",
    type: [UserWithoutPassword]
  })
  data: UserWithoutPassword[];
}

export const FindAllUserResponses = applyDecorators(
  ApiOkResponse({
    description: "Find all users successfully",
    type: FindAllUserDTO
  })
);
