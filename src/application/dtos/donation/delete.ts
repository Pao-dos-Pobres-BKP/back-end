import { applyDecorators } from "@nestjs/common";
import { ApiNoContentResponse, ApiNotFoundResponse } from "@nestjs/swagger";

export const DeleteDonationResponses = applyDecorators(
  ApiNoContentResponse({
    description: "Donoation delete successfully"
  }),
  ApiNotFoundResponse({
    description: "Not found a donation with this id"
  })
);
