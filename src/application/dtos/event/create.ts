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
    description: "Event location (optional)",
    example: "Rua das Flores, 123 - Centro, São Paulo/SP",
    required: false
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: "Event URL (optional)",
    example: "https://evento.com.br",
    required: false
  })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({
    description: "Event date (optional, must be a valid ISO date)",
    example: "2025-12-31"
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: "Date must be a valid ISO date" })
  date?: Date;
}

export const CreateEventResponses = applyDecorators(
  ApiCreatedResponse({
    description: "Event created successfully"
  })
);
