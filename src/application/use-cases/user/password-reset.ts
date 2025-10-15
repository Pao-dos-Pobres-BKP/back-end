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

  async requestToken({ email }: PasswordResetDTO): Promise<void> {

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.exceptionService.notFound({ message: "User not found" });
    }

    const hasValidToken = await this.userRepository.findPasswordResetTokenByUserId(user.id);

    console.log ("passei por aqui", user, hasValidToken, new Date())
    if (hasValidToken && hasValidToken.expiresAt > new Date(Date.now() + 1 * 60 * 1000)) {
      console.log("passei no if")
      this.exceptionService.badRequest({
        message: "A valid token has already been sent to this email"
      });
    }

    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const hashedToken = await this.hashService.generateHash(token);


    //trocar pelo serviço de email!!!!!
    console.log(`Password reset token for ${email}: ${token}`);

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.userRepository.requestToken(
      user.id,
      hashedToken,
      expiresAt
    );
  }

  async findPasswordResetTokenByUserId(userId: string) {
    return this.userRepository.findPasswordResetTokenByUserId(userId);
  }

  async validateUserToken(email: string, plainToken: string) {

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      this.exceptionService.notFound({ message: "User not found" });
    }

    const hasValidToken = await this.userRepository.findPasswordResetTokenByUserId(user.id);

    if (!hasValidToken && hasValidToken.expiresAt < new Date(Date.now() + 1 * 60 * 1000)) {
      this.exceptionService.badRequest({message: ""})
    }

    const hashToken = await this.hashService.generateHash(plainToken)

    const compare = await this.hashService.compare(hashToken, hasValidToken.token)

    if (!compare) {
      this.exceptionService.badRequest({message: "Invalid Token"})
    }

    return true;
  }
}
