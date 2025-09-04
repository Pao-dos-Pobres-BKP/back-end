import { applyDecorators } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse
} from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    description: "Administrator email address",
    example: "admin@example.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Administrator password (minimum 8 characters)",
    example: "Senha123"
  })
  @IsString()
  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: "Defines if the administrator is root",
    example: false
  })
  @IsBoolean()
  root: boolean;
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
