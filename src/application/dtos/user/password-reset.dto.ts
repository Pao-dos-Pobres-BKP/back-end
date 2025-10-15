import { applyDecorators } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class PasswordResetDTO {
  @ApiProperty({
    description: "User email",
    example: "user@example.com"
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export const PasswordResetResponses = applyDecorators(
  ApiCreatedResponse({
    description: "Password reset token created and sent to email"
  }),
  ApiOperation({
    summary: "Request password reset",
    description:
      "Generates a password reset token and sends it to the user's email."
  })
);
