import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
  @ApiProperty({
    example: "novaSenhaSegura123",
    description: "Nova senha que será definida"
  })
  @IsString()
  @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres." })
  @IsNotEmpty()
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}
