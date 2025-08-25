import { applyDecorators } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty
} from "@nestjs/swagger";

export class EventDetails {
  @ApiProperty({
    description: "Unique identifier of the event",
    example: "123e4567-e89b-12d3-a456-426614174000"
  })
  id: string;

  @ApiProperty({
    description: "Title of the event",
    example: "Campanha de Inverno"
  })
  title: string;

  @ApiProperty({
    description: "Detailed description of the event",
    example: "Campanha para arrecadar agasalhos durante o inverno."
  })
  description: string;

  @ApiProperty({
    description: "Location where the event will take place",
    example: "Rua A, 123 - Centro, São Paulo",
    required: false
  })
  location?: string;

  @ApiProperty({
    description: "URL related to the event (optional)",
    example: "https://evento.com.br",
    required: false
  })
  url?: string;

  @ApiProperty({
    description: "Date and time of the event (optional)",
    example: "2025-12-31T14:00:00.000Z",
    required: false
  })
  date?: Date;

  @ApiProperty({
    description: "Date the event was created in the system",
    example: "2025-08-01T10:00:00.000Z"
  })
  createdAt: Date;

  @ApiProperty({
    description: "Date the event was last updated in the system",
    example: "2025-08-10T15:30:00.000Z"
  })
  updatedAt: Date;
}

export const FindEventByIdResponses = applyDecorators(
  ApiOkResponse({
    description: "Event found with this ID",
    type: EventDetails
  }),
  ApiNotFoundResponse({
    description: "No event found with this ID"
  })
);
