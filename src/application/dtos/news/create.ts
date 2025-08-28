import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength
} from "class-validator";

export class CreateNewsDto {
  @ApiProperty({ example: "Campanha de Inverno lançada" })
  @IsString()
  @MinLength(3)
  @MaxLength(140)
  title!: string;

  @ApiProperty({ example: "Descrição completa da notícia..." })
  @IsString()
  @MinLength(3)
  description!: string;

  @ApiPropertyOptional({ example: "2025-08-27" })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ example: "Porto Alegre/RS" })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: "https://exemplo.com/noticia" })
  @IsOptional()
  @IsUrl()
  url?: string;
}
