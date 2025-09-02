import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  Matches,
  IsNotEmpty
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateNewsDto {
  @ApiProperty({
    description: "Título da notícia (mínimo 3 e máximo 140 caracteres)",
    example: "Campanha de Inverno lançada"
  })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString({ message: "title deve ser uma string" })
  @IsNotEmpty({ message: "title é obrigatório" })
  @MinLength(3, { message: "title deve ter pelo menos 3 caracteres" })
  @MaxLength(140, { message: "title deve ter no máximo 140 caracteres" })
  title: string;

  @ApiProperty({
    description: "Descrição completa da notícia (máx. 2000 caracteres)",
    example: "Descrição completa da notícia..."
  })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString({ message: "description deve ser uma string" })
  @MinLength(3, { message: "description deve conter pelo menos 3 caracteres" })
  @MaxLength(2000, {
    message: "description deve ter no máximo 2000 caracteres"
  })
  description: string;

  @ApiPropertyOptional({
    description: "Data da publicação no formato YYYY-MM-DD (date-only)",
    example: "2025-08-27"
  })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "date deve estar no formato YYYY-MM-DD"
  })
  date?: string;

  @ApiPropertyOptional({
    description: "Local onde a notícia ocorreu",
    example: "Porto Alegre/RS"
  })
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsOptional()
  @IsString({ message: "location deve ser uma string" })
  @MaxLength(140, { message: "location deve ter no máximo 140 caracteres" })
  location?: string;

  @ApiPropertyOptional({
    description: "URL externa relacionada à notícia",
    example: "https://exemplo.com/noticia"
  })
  @IsOptional()
  @IsUrl(
    { require_protocol: true, require_tld: true },
    { message: "url deve ser uma URL válida (inclua http/https)" }
  )
  url?: string;
}
