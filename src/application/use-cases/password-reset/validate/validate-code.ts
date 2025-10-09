import { Injectable } from "@nestjs/common";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { UserRepository } from "@domain/repositories/user";
import * as bcrypt from "bcryptjs";

@Injectable()
export class ValidateCodeUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
    private readonly exceptions: ExceptionsAdapter
  ) {}

  async execute(email: string, code: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.exceptions.notFound({
        message: "Usuário não encontrado."
      });
      return;
    }

    const token =
      await this.passwordResetTokenRepository.findLatestValidTokenByUserId(
        user.id
      );
    if (!token) {
      this.exceptions.badRequest({
        message: "Nenhuma solicitação de recuperação encontrada."
      });
      return;
    }

    const isValid = await bcrypt.compare(code, token.token);
    if (!isValid) {
      this.exceptions.badRequest({
        message: "Código inválido."
      });
      return;
    }

    const now = new Date();
    if (token.expiresAt < now) {
      this.exceptions.badRequest({
        message: "O código de recuperação expirou."
      });
      return;
    }
  }
}
