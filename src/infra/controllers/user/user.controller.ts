import {
  PasswordResetDTO,
  PasswordResetResponses
} from "@application/dtos/user/password-reset.dto";
import { ValidateUserTokenDTO } from "@application/dtos/user/validate-token.dto";
import { PasswordResetUseCase } from "@application/use-cases/user/password-reset";
import { UserRepository } from "@domain/repositories/user";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly passwordResetUseCase: PasswordResetUseCase, private readonly userRepository: UserRepository) {}

  @Post("password-reset")
  @PasswordResetResponses
  async passwordReset(@Body() body: PasswordResetDTO): Promise<void> {
    return this.passwordResetUseCase.requestToken(body);
  }

  @Post("test")
  async teste(@Body() body: ValidateUserTokenDTO): Promise<void> {
    return this.userRepository.
}
