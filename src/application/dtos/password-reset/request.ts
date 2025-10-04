import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RequestPasswordResetDto {
  @ApiProperty({
    example: "usuario@email.com",
    description: "Email do usuário que deseja redefinir a senha"
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export interface RequestPasswordResetResponse {
  message: string;
}
