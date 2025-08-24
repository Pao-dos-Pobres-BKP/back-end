import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  PartialType
} from "@nestjs/swagger";
import { CreateDonorDTO } from "./create";
import { applyDecorators } from "@nestjs/common";

export class UpdateDonorDTO extends PartialType(CreateDonorDTO) {}

export const UpdateDonorResponses = applyDecorators(
  ApiNoContentResponse({
    description: "Donor updated successfully"
  }),
  ApiNotFoundResponse({
    description: "Donor not found"
  })
);
