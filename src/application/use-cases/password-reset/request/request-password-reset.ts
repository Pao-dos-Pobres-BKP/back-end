import { Injectable } from "@nestjs/common";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { UserRepository } from "@domain/repositories/user";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import * as bcrypt from "bcryptjs";
import { SendEmailUseCase } from "../../mail/send/send-email";
import { santoAntonioTemplate } from "@domain/email-templates/email-template";

@Injectable()
export class RequestPasswordResetUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
    private readonly exceptions: ExceptionsAdapter,
    private readonly sendEmailUseCase: SendEmailUseCase
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.exceptions.notFound({
        message: "Usuário não encontrado."
      });
      return;
    }

    const recentRequests =
      await this.passwordResetTokenRepository.countRecentRequests(user.id, 5);
    if (recentRequests > 0) {
      this.exceptions.badRequest({
        message: "Já existe uma solicitação recente. Aguarde o código expirar."
      });
    }

    const code = this.generateNumericCode();
    const tokenHash = await bcrypt.hash(code, 10);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000);

    await this.passwordResetTokenRepository.create({
      tokenHash,
      userId: user.id,
      expiresAt
    });

    const subject = "Recuperação de Senha";
    const html = santoAntonioTemplate(subject, user.fullName);
    const text = `Seu código de recuperação é: ${code}`;

    await this.sendEmailUseCase.execute({
      to: [email],
      subject,
      html,
      text
    });
  }

  private generateNumericCode(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }
}
