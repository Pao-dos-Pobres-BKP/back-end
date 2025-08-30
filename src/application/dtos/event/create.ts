import { applyDecorators } from "@nestjs/common";
import { ApiCreatedResponse, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength
} from "class-validator";

export class CreateEventDTO {
  @ApiProperty({
    description: "Event title",
    example: "Campanha de Arrecadação de Alimentos"
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: "Event description",
    example:
      "Evento para arrecadar alimentos não perecíveis para famílias carentes"
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @ApiProperty({
    description: "Event location",
    example: "Rua das Flores, 123 - Centro, São Paulo/SP",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: "Event URL",
    example: "https://evento.com.br",
    required: false
  })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({
    description: "Starting date of th event, must be a valid ISO date",
    example: "2025-12-31"
  })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate({ message: "Date must be a valid ISO date" })
  dateStart: Date;

  @ApiProperty({
    description: "Ending date of the event, must be a valid ISO date)",
    example: "2025-12-31"
  })
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate({ message: "Date must be a valid ISO date" })
  dateEnd: Date;
}

export const CreateEventResponses = applyDecorators(
  ApiCreatedResponse({
    description: "Event created successfully"
  })
);
