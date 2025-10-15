import {
  PasswordResetDTO,
  PasswordResetResponses
} from "@application/dtos/user/password-reset.dto";
import { PasswordResetUseCase } from "@application/use-cases/user/password-reset";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly passwordResetUseCase: PasswordResetUseCase) {}

  @Post("password-reset")
  @PasswordResetResponses
  async passwordReset(@Body() body: PasswordResetDTO): Promise<void> {
    return this.passwordResetUseCase.execute(body);
  }

  @Post("validate-password-reset-token")
  async validatePasswordResetToken(
    @Body() body: { email: string; token: string }
  ) {
    const { email, token } = body;
    return this.passwordResetUseCase.validatePasswordResetToken(email, token);
  }

  @Post("change-password")
  async changePassword(
    @Body() body: { email: string; newPassword: string }
  ): Promise<void> {
    const { email, newPassword } = body;
    return this.passwordResetUseCase.changePassword(email, newPassword);
  }
}
