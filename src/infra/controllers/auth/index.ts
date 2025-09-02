import {
  LoginDTO,
  LoginResponse,
  LoginResponses
} from "@application/dtos/auth/login";
import { LoginUseCase } from "@application/use-cases/auth/login/login";
import { Body, Controller, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post("login")
  @LoginResponses
  async login(@Body() body: LoginDTO): Promise<LoginResponse | void> {
    return await this.loginUseCase.execute(body);
  }
}
