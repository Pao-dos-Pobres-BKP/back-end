import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  PartialType
} from "@nestjs/swagger";
import { CreateDonationDTO } from "./create";
import { applyDecorators } from "@nestjs/common";

export class UpdateDonationDTO extends PartialType(CreateDonationDTO) {}

export const UpdateDonationResponses = applyDecorators(
  ApiNoContentResponse({
    description: "Donation updated successfully"
  }),
  ApiNotFoundResponse({
    description: "Donation not found"
  })
);
