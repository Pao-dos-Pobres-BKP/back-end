import { Injectable } from "@nestjs/common";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { DonorRepository } from "@domain/repositories/donor";
import { AdminRepository } from "@domain/repositories/admin";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import * as bcrypt from "bcryptjs";

interface ResetPasswordParams {
  email: string;
  newPassword: string;
}

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly passwordResetTokenRepository: PasswordResetTokenRepository,
    private readonly donorRepository: DonorRepository,
    private readonly adminRepository: AdminRepository,
    private readonly exceptions: ExceptionsAdapter
  ) {}

  async execute(params: ResetPasswordParams): Promise<void> {
    const { email, newPassword } = params;

    const donor = await this.donorRepository.findByEmail?.(email);
    const admin = await this.adminRepository.findByEmail?.(email);

    const user = donor || admin;
    if (!user) {
      this.exceptions.notFound({
        message: "Usuário não encontrado."
      });
      return;
    }

    const userId = user.id;

    const latestToken =
      await this.passwordResetTokenRepository.findLatestValidTokenByUserId(
        userId
      );
    if (!latestToken) {
      this.exceptions.badRequest({
        message: "Nenhum código de recuperação válido encontrado."
      });
      return;
    }

    if (latestToken.expiresAt <= new Date()) {
      this.exceptions.badRequest({
        message: "O código de recuperação expirou."
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (donor) {
      await this.donorRepository.update(userId, { password: hashedPassword });
    } else if (admin) {
      await this.adminRepository.update(userId, { password: hashedPassword });
    }

    await this.passwordResetTokenRepository.markAsUsed(latestToken.id);
  }
}
