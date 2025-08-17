import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength
} from "class-validator";

export class CreateUserDTO {
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
