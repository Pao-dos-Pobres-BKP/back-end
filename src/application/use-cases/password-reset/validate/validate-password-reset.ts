import { Injectable } from "@nestjs/common";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { UserRepository } from "@domain/repositories/user";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import * as bcrypt from "bcryptjs";

interface ValidatePasswordResetParams {
  email: string;
  code: string;
}

@Injectable()
export class ValidatePasswordReset {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
    private readonly exceptions: ExceptionsAdapter
  ) {}

  async execute(params: ValidatePasswordResetParams): Promise<void> {
    const { email, code } = params;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.exceptions.notFound({
        message: "Usuário não encontrado."
      });
    }

    const latestToken =
      await this.passwordResetTokenRepository.findLatestValidTokenByUserId(
        user.id
      );
    if (!latestToken) {
      this.exceptions.notFound({
        message: "Nenhum código de recuperação encontrado para este usuário."
      });
    }

    if (latestToken.expiresAt <= new Date()) {
      this.exceptions.badRequest({
        message: "O código de recuperação expirou."
      });
    }

    const isCodeValid = await bcrypt.compare(code, latestToken.token);
    if (!isCodeValid) {
      this.exceptions.badRequest({
        message: "Código de recuperação inválido."
      });
    }

    await this.passwordResetTokenRepository.markAsUsed(latestToken.id);
  }
}
