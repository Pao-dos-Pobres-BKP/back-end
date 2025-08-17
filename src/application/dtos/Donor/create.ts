import { cleanCPF, IsCPF } from "@application/dtos/utils/is-cpf";
import { ApiProperty } from "@nestjs/swagger";
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
