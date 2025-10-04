import { Test, TestingModule } from "@nestjs/testing";
import { RequestPasswordResetUseCase } from "./request-password-reset";
import { UserRepository } from "@domain/repositories/user";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { ExceptionsServiceStub } from "test/stubs/adapters/exceptions";
import { SendEmailUseCase } from "@application/use-cases/mail/send/send-email";
import * as bcrypt from "bcryptjs";

describe("RequestPasswordReset", () => {
  let service: RequestPasswordResetUseCase;
  let userRepository: Partial<UserRepository>;
  let tokenRepository: Partial<PasswordResetTokenRepository>;
  let sendEmailUseCase: Partial<SendEmailUseCase>;
  let exceptions: ExceptionsServiceStub;

  const email = "test@example.com";
  const user = {
    id: "user-id",
    email,
    fullName: "Test User"
  };

  beforeEach(async () => {
    userRepository = {
      findByEmail: jest.fn()
    };

    tokenRepository = {
      countRecentRequests: jest.fn(),
      create: jest.fn()
    };

    sendEmailUseCase = {
      execute: jest.fn()
    };

    exceptions = new ExceptionsServiceStub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestPasswordResetUseCase,
        { provide: UserRepository, useValue: userRepository },
        { provide: PasswordResetTokenRepository, useValue: tokenRepository },
        { provide: SendEmailUseCase, useValue: sendEmailUseCase },
        { provide: "ExceptionsAdapter", useValue: exceptions }
      ]
    }).compile();

    service = module.get(RequestPasswordResetUseCase);

    jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed-code" as never);
  });

  it("should raise an exception if the user is not found", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(service.execute(email)).rejects.toThrow("User not found.");
  });

  it("should raise an exception if there has been a recent request", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (tokenRepository.countRecentRequests as jest.Mock).mockResolvedValue(1);

    await expect(service.execute(email)).rejects.toThrow(
      "There already is a recent request. Wait for the token to expire."
    );
  });

  it("should create token and send e-mail if there are not any recent requests", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (tokenRepository.countRecentRequests as jest.Mock).mockResolvedValue(0);

    const createSpy = jest.spyOn(tokenRepository, "create");
    const emailSpy = jest.spyOn(sendEmailUseCase, "execute");

    await service.execute(email);

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: user.id,
        tokenHash: "hashed-code",
        expiresAt: expect.any(Date)
      })
    );

    expect(emailSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        to: [email],
        subject: "Recuperação de Senha",
        html: expect.stringContaining("Feliz Dia de Santo Antônio"),
        text: expect.stringContaining("Seu código de recuperação é:")
      })
    );
  });
});
