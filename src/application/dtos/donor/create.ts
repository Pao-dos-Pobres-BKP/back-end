import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
  IsPhoneNumber,
  IsDate,
  IsOptional,
  IsEnum
} from "class-validator";
import { Type } from "class-transformer";
import { Gender } from "@domain/entities/donor";

export class CreateDonorDTO {
  @ApiProperty({
    description: "User name",
    example: "John Doe"
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    description: "User phone",
    example: "+5511999999999"
  })
  @IsString()
  @IsOptional()
  @IsPhoneNumber("BR")
  phone?: string;

  @ApiProperty({
    description: "Birth Date",
    example: "",
    required: true
  })
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @ApiProperty({
    description: "User role",
    example: Gender.MALE,
    required: true
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  role: Gender;

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
}
