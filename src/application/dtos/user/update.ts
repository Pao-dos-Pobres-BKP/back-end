import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, PartialType } from "@nestjs/swagger";
import { CreateUserDTO, UserWithoutPassword } from "./create";

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

export const UpdateUserResponses = applyDecorators(
  ApiOkResponse({
    description: "User updated successfully",
    type: UserWithoutPassword
  })
);
