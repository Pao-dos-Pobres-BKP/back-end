import { PasswordResetDTO } from "@application/dtos/user/password-reset.dto";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { HashAdapter } from "@domain/adapters/hash";
import { UserRepository } from "@domain/repositories/user";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PasswordResetUseCase {
  constructor(
    private readonly exceptionService: ExceptionsAdapter,
    private readonly hashService: HashAdapter,
    private readonly userRepository: UserRepository
  ) {}

  async execute({ email }: PasswordResetDTO): Promise<void> {
    const code =
      await this.userRepository.findIfUserRequestedPasswordReset(email);

    if (code && new Date(code.expiresAt) > new Date()) {
      return this.exceptionService.badRequest({
        message:
          "User already requested a password reset. Please check your email."
      });
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return this.exceptionService.notFound({ message: "User not found" });
    }

    const plainToken = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(`Password reset token for ${email}: ${plainToken}`);

    const token = await this.hashService.generateHash(plainToken);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

    if (!code || new Date(code.expiresAt) < new Date()) {
      await this.userRepository.upsertPasswordReset(user.id, token, expiresAt);
    }
  }

  async validatePasswordResetToken(email: string, token: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return this.exceptionService.notFound({ message: "User not found" });
    }

    const hashedToken = await this.hashService.generateHash(token);
    const compareHash = await this.hashService.compare(token, hashedToken);

    if (!compareHash) return false;

    return this.userRepository.validatePasswordResetToken(
      user.email,
      hashedToken
    );
  }

  async changePassword(email: string, newPassword: string): Promise<void> {
    const hashedPassword = await this.hashService.generateHash(newPassword);
    await this.userRepository.changePassword(email, hashedPassword);
  }
}
