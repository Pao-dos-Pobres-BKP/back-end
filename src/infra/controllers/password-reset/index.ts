import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequestPasswordResetUseCase } from "@application/use-cases/password-reset/request/request-password-reset";
import { ValidateCodeUseCase } from "@application/use-cases/password-reset/validate/validate-code";
import { ResetPasswordUseCase } from "@application/use-cases/password-reset/reset/reset-password";
import { RequestPasswordResetDto } from "@application/dtos/password-reset/request";
import { ValidateCodeDto } from "@application/dtos/password-reset/validate";
import { ResetPasswordDto } from "@application/dtos/password-reset/reset";

@ApiTags("Password-Reset")
@Controller("password-reset")
export class PasswordResetController {
  constructor(
    private readonly requestPasswordReset: RequestPasswordResetUseCase,
    private readonly validatePasswordReset: ValidateCodeUseCase,
    private readonly resetPassword: ResetPasswordUseCase
  ) {}

  @Post("request")
  @HttpCode(HttpStatus.OK)
  async requestReset(@Body() dto: RequestPasswordResetDto): Promise<void> {
    await this.requestPasswordReset.execute(dto.email);
  }

  @Post("validate")
  @HttpCode(HttpStatus.OK)
  async validateCode(@Body() dto: ValidateCodeDto): Promise<void> {
    await this.validatePasswordReset.execute(dto.email, dto.code);
  }

  @Post("reset/:email")
  @HttpCode(HttpStatus.OK)
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
