import { applyDecorators } from "@nestjs/common";
import { ApiNoContentResponse, ApiNotFoundResponse } from "@nestjs/swagger";

export const DeleteDonorResponses = applyDecorators(
  ApiNoContentResponse({
    description: "Donor delete successfully"
  }),
  ApiNotFoundResponse({
    description: "Not found a donor with this id"
  })
);
