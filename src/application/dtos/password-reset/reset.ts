import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
  @ApiProperty({
    example: "novaSenhaSegura123",
    description: "Nova senha que será definida"
  })
  @IsString()
  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres." })
  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}
