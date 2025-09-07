import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsDate
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateNewsDto {
  @ApiProperty({
    description: "News title (minimum 3 and maximum 140 characters)",
    example: "Winter Campaign Launched"
  })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(140)
  title: string;

  @ApiProperty({
    description: "Full news description (maximum 2000 characters)",
    example: "Complete description of the news..."
  })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @MinLength(3)
  @MaxLength(2000)
  description: string;

  @ApiPropertyOptional({
    description: "Publication date in YYYY-MM-DD format (date-only)",
    example: "2025-08-27"
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : value), {
    toClassOnly: true
  })
  date?: Date;

  @ApiPropertyOptional({
    description: "Location where the news took place",
    example: "Porto Alegre/RS"
  })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsOptional()
  @IsString()
  @MaxLength(140)
  location?: string;

  @ApiPropertyOptional({
    description: "External URL related to the news",
    example: "https://example.com/news"
  })
  @IsOptional()
  @IsUrl({ require_protocol: true, require_tld: true })
  url?: string;
}
