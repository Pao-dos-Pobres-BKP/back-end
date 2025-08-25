import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  PartialType
} from "@nestjs/swagger";
import { CreateEventDTO } from "./create";
import { applyDecorators } from "@nestjs/common";

export class UpdateEventDTO extends PartialType(CreateEventDTO) {}

export const UpdateEventResponses = applyDecorators(
  ApiNoContentResponse({
    description: "Event updated successfully"
  }),
  ApiNotFoundResponse({
    description: "Event not found"
  })
);
