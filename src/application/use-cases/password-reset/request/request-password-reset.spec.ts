import { RequestPasswordResetUseCase } from "./request-password-reset";
import { UserRepository } from "@domain/repositories/user";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { SendEmailUseCase } from "@application/use-cases/mail/send/send-email";
import { ExceptionsServiceStub } from "@test/stubs/adapters/exceptions";
import * as bcrypt from "bcryptjs";

describe("RequestPasswordReset", () => {
  let userRepository: UserRepository;
  let tokenRepository: PasswordResetTokenRepository;
  let sendEmailUseCase: SendEmailUseCase;
  let exceptions: ExceptionsServiceStub;
  let useCase: RequestPasswordResetUseCase;

  const email = "test@example.com";
  const user = {
    id: "user-id",
    email,
    fullName: "Test User"
  };

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn()
    } as unknown as UserRepository;

    tokenRepository = {
      countRecentRequests: jest.fn(),
      create: jest.fn()
    } as unknown as PasswordResetTokenRepository;

    sendEmailUseCase = {
      execute: jest.fn()
    } as unknown as SendEmailUseCase;

    exceptions = new ExceptionsServiceStub();

    useCase = new RequestPasswordResetUseCase(
      userRepository,
      tokenRepository,
      exceptions,
      sendEmailUseCase
    );

    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(async () => "hashed-password");
    jest.spyOn(tokenRepository, "create");
    jest.spyOn(sendEmailUseCase, "execute");
  });

  it("should throw if user not found", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute(email)).rejects.toThrow(
      "Usuário não encontrado."
    );
  });

  it("should throw if recent request exists", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (tokenRepository.countRecentRequests as jest.Mock).mockResolvedValue(1);

    await expect(useCase.execute(email)).rejects.toThrow(
      "Já existe uma solicitação recente. Aguarde o código expirar."
    );
  });

  it("should create token and send e-mail when no recent request", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (tokenRepository.countRecentRequests as jest.Mock).mockResolvedValue(0);

    await useCase.execute(email);

    expect(tokenRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: user.id,
        tokenHash: "hashed-code",
        expiresAt: expect.any(Date)
      })
    );
    expect(sendEmailUseCase.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        to: [email],
        subject: "Recuperação de Senha",
        html: expect.stringContaining("Feliz Dia de Santo Antônio"),
        text: expect.stringContaining("Seu código de recuperação é:")
      })
    );
  });
});
