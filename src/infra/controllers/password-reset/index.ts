import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { RequestPasswordResetUseCase } from "@application/use-cases/password-reset/request/request-password-reset";
import { ValidatePasswordResetUseCase } from "@application/use-cases/password-reset/validate/validate-password-reset";
import { ResetPasswordUseCase } from "@application/use-cases/password-reset/reset/reset-password";
import { RequestPasswordResetDto } from "@application/dtos/password-reset/request";
import { ValidatePasswordResetDto } from "@application/dtos/password-reset/validate";
import { ResetPasswordDto } from "@application/dtos/password-reset/reset";

@ApiTags("Password-Reset")
@Controller("password-reset")
export class PasswordResetController {
  constructor(
    private readonly requestPasswordReset: RequestPasswordResetUseCase,
    private readonly validatePasswordReset: ValidatePasswordResetUseCase,
    private readonly resetPassword: ResetPasswordUseCase
  ) {}

  @Post("request")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Solicitar código de recuperação de senha" })
  @ApiResponse({
    status: 200,
    description: "Código enviado por e-mail com sucesso."
  })
  async requestReset(@Body() dto: RequestPasswordResetDto): Promise<void> {
    await this.requestPasswordReset.execute(dto.email);
  }

  @Post("validate")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Validar código de recuperação" })
  @ApiResponse({
    status: 200,
    description: "Código válido e dentro do prazo."
  })
  async validateCode(@Body() dto: ValidatePasswordResetDto): Promise<void> {
    await this.validatePasswordReset.execute(dto.email, dto.code);
  }

  @Post("reset/:email")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Redefinir senha com código previamente validado" })
  @ApiResponse({
    status: 200,
    description: "Senha redefinida com sucesso."
  })
  async passwordReset(
    @Param("email") email: string,
    @Body() dto: ResetPasswordDto
  ): Promise<void> {
    await this.resetPassword.execute({
      email,
      newPassword: dto.newPassword
    });
  }
}
