import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsletterDto {
  @ApiProperty({
    example: "user@mail.com",
    description: "Email para inscrição na newsletter"
  })
  @IsEmail({}, { message: "Email inválido" })
  @IsNotEmpty({ message: "O email é obrigatório" })
  email: string;
}

export interface CreateNewsletterResponse {
  message: string;
}
