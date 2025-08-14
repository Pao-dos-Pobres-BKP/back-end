import { cleanCPF, IsCPF } from "@application/dtos/utils/is-cpf";
import { applyDecorators } from "@nestjs/common";
import { ApiCreatedResponse, ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength
} from "class-validator";

export class CreateUserDTO {
  @ApiProperty({
    description: "User name",
    example: "John Doe"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "User email",
    example: "john.doe@example.com"
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User password",
    example: "Senha@123"
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: "User cpf",
    example: "12345678900"
  })
  @IsString()
  @IsNotEmpty()
  @IsCPF()
  @Transform(({ value }) => cleanCPF(value))
  cpf: string;

  @ApiProperty({
    description: "User phone",
    example: "+5511999999999"
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber("BR")
  phone: string;

  @ApiProperty({
    description: "User address",
    example: "123 Main St"
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: "User city",
    example: "New York"
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: "User state",
    example: "NY"
  })
  @IsString()
  @IsNotEmpty()
  state: string;
}

export class UserWithoutPassword {
  @ApiProperty({
    description: "User unique identifier",
    example: "11dfcafa-c204-4de4-96cb-df359533cada"
  })
  id: string;

  @ApiProperty({
    description: "User email address",
    example: "john.doe4@example.com"
  })
  email: string;

  @ApiProperty({
    description: "User full name",
    example: "John Doe"
  })
  name: string;

  @ApiProperty({
    description: "User role in the system",
    example: "BASIC",
    enum: ["BASIC", "ADMIN", "MODERATOR"]
  })
  role: string;

  @ApiProperty({
    description: "User CPF (Brazilian tax ID)",
    example: "45503505042"
  })
  cpf: string;

  @ApiProperty({
    description: "User phone number",
    example: "51999273042"
  })
  phone: string;

  @ApiProperty({
    description: "User address",
    example: "123 Main St"
  })
  address: string;

  @ApiProperty({
    description: "User city",
    example: "New York"
  })
  city: string;

  @ApiProperty({
    description: "User state",
    example: "NY"
  })
  state: string;

  @ApiProperty({
    description: "User creation timestamp",
    example: "2025-08-01T18:20:49.033Z"
  })
  createdAt: Date;

  @ApiProperty({
    description: "User last update timestamp",
    example: "2025-08-01T18:20:49.033Z"
  })
  updatedAt: Date;
}

export const CreateUserResponses = applyDecorators(
  ApiCreatedResponse({
    description: "User created successfully",
    type: UserWithoutPassword
  })
);
