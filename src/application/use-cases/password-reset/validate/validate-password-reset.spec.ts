import { ValidatePasswordResetUseCase } from "./validate-password-reset";
import { UserRepository } from "@domain/repositories/user";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import * as bcrypt from "bcryptjs";

describe("ValidatePasswordReset", () => {
  let userRepository: UserRepository;
  let tokenRepository: PasswordResetTokenRepository;
  let exceptions: ExceptionsServiceStub;
  let useCase: ValidatePasswordResetUseCase;

  const email = "test@example.com";
  const user = { id: "user-id", email };
  const code = "1234";
  const hashedCode = "hashed-code";
  const validToken = {
    id: "token-id",
    token: hashedCode,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  };

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn()
    } as unknown as UserRepository;

    tokenRepository = {
      findLatestValidTokenByUserId: jest.fn()
    } as unknown as PasswordResetTokenRepository;

    exceptions = new ExceptionsServiceStub();

    useCase = new ValidatePasswordResetUseCase(
      userRepository,
      tokenRepository,
      exceptions
    );

    jest.spyOn(bcrypt, "compare").mockImplementation(async (raw, hashed) => {
      return raw === code && hashed === hashedCode;
    });
    jest.spyOn(tokenRepository, "findLatestValidTokenByUserId");
  });

  it("should throw if user not found", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute(email, code)).rejects.toThrow(
      "Usuário não encontrado."
    );
  });

  it("should throw if no valid token found", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(null);

    await expect(useCase.execute(email, code)).rejects.toThrow(
      "Nenhuma solicitação de recuperação encontrada para este usuário."
    );
  });

  it("should throw if token invalid", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(validToken);
    jest.spyOn(bcrypt, "compare").mockImplementation(async () => false);

    await expect(useCase.execute(email, "wrong-code")).rejects.toThrow(
      "Código de recuperação inválido."
    );
  });

  it("should throw if token expired", async () => {
    const expired = { ...validToken, expiresAt: new Date(Date.now() - 1000) };
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(expired);
    jest.spyOn(bcrypt, "compare").mockImplementation(async () => true);

    await expect(useCase.execute(email, code)).rejects.toThrow(
      "O código de recuperação expirou."
    );
  });

  it("should succeed if valid token", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(validToken);
    jest.spyOn(bcrypt, "compare").mockImplementation(async () => true);

    await expect(useCase.execute(email, code)).resolves.toBeUndefined();
  });
});
