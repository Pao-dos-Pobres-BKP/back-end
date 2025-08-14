import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { UserWithoutPassword } from "./create";

export const FindByIdUserResponses = applyDecorators(
  ApiOkResponse({
    description: "Find user by id successfully",
    type: UserWithoutPassword
  })
);
