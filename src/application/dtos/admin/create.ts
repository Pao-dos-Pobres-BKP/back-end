import { applyDecorators } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiProperty,
  ApiPropertyOptional,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse
} from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "admin@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "S3nhaF0rte!" })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password!: string;

  @ApiPropertyOptional({
    example: false,
    description: "Define se o administrador é root"
  })
  @IsOptional()
  @IsBoolean()
  root?: boolean;
}

export const CreateAdminResponses = applyDecorators(
  ApiCreatedResponse({
    description: "Admin created successfully"
  }),
  ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing token"
  }),
  ApiForbiddenResponse({
    description: "Forbidden - Only admins can create other admins"
  })
);
