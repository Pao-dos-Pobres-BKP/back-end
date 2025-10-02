import { Test, TestingModule } from "@nestjs/testing";
import { ValidatePasswordReset } from "./validate-password-reset";
import { UserRepository } from "@domain/repositories/user";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { ExceptionsServiceStub } from "test/stubs/adapters/exceptions";
import * as bcrypt from "bcryptjs";

describe("ValidatePasswordReset", () => {
  let service: ValidatePasswordReset;
  let userRepository: Partial<UserRepository>;
  let tokenRepository: Partial<PasswordResetTokenRepository>;
  let exceptions: ExceptionsServiceStub;

  const email = "test@example.com";
  const user = { id: "user-123", email };
  const token = {
    id: "token-abc",
    token: "hashed-code",
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  };

  beforeEach(async () => {
    userRepository = {
      findByEmail: jest.fn()
    };

    tokenRepository = {
      findLatestValidTokenByUserId: jest.fn(),
      markAsUsed: jest.fn()
    };

    exceptions = new ExceptionsServiceStub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidatePasswordReset,
        { provide: UserRepository, useValue: userRepository },
        { provide: PasswordResetTokenRepository, useValue: tokenRepository },
        { provide: "ExceptionsAdapter", useValue: exceptions }
      ]
    }).compile();

    service = module.get(ValidatePasswordReset);

    jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);
  });

  it("deve lançar exceção se o usuário não for encontrado", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(service.execute({ email, code: "1234" })).rejects.toThrow(
      "Usuário não encontrado."
    );
  });

  it("deve lançar exceção se nenhum token válido for encontrado", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(null);

    await expect(service.execute({ email, code: "1234" })).rejects.toThrow(
      "Nenhum código de recuperação encontrado para este usuário."
    );
  });

  it("deve lançar exceção se o token estiver expirado", async () => {
    const expiredToken = { ...token, expiresAt: new Date(Date.now() - 1000) };

    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(expiredToken);

    await expect(service.execute({ email, code: "1234" })).rejects.toThrow(
      "O código de recuperação expirou."
    );
  });

  it("deve lançar exceção se o código estiver incorreto", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(token);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

    await expect(service.execute({ email, code: "wrong" })).rejects.toThrow(
      "Código de recuperação inválido."
    );
  });

  it("deve marcar token como usado se o código for válido", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(token);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);

    await service.execute({ email, code: "1234" });

    expect(tokenRepository.markAsUsed).toHaveBeenCalledWith(token.id);
  });
});
