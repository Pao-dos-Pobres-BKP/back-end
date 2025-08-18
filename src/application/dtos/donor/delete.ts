import { applyDecorators } from "@nestjs/common";
import { ApiNoContentResponse } from "@nestjs/swagger";

export const DeleteUserResponses = applyDecorators(
  ApiNoContentResponse({
    description: "User deleted successfully"
  })
);
