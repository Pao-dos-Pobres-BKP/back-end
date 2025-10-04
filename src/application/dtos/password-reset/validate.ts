import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ValidatePasswordResetDto {
  @ApiProperty({
    example: "usuario@email.com",
    description: "Email do usuário que solicitou a redefinição"
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "1234",
    description: "Código de 4 dígitos recebido por e-mail"
  })
  @IsString()
  @Length(4, 4, { message: "O código deve ter exatamente 4 dígitos." })
  @IsNotEmpty()
  code: string;
}

export interface ValidatePasswordResetResponse {
  message: string;
}
