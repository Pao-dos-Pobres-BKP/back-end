import { applyDecorators } from "@nestjs/common";
import { ApiNoContentResponse, ApiNotFoundResponse } from "@nestjs/swagger";

export const DeleteAdminResponses = applyDecorators(
  ApiNoContentResponse({
    description: "Admin delete successfully"
  }),
  ApiNotFoundResponse({
    description: "Not found a admin with this id"
  })
);
