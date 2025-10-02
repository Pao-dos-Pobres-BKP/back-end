import { Test, TestingModule } from "@nestjs/testing";
import { RequestPasswordReset } from "./request-password-reset";
import { UserRepository } from "@domain/repositories/user";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { ExceptionsServiceStub } from "test/stubs/adapters/exceptions";
import * as bcrypt from "bcryptjs";

describe("RequestPasswordReset", () => {
  let service: RequestPasswordReset;
  let userRepository: Partial<UserRepository>;
  let tokenRepository: Partial<PasswordResetTokenRepository>;
  let exceptions: ExceptionsServiceStub;

  const user = { id: "user-123", email: "test@example.com" };

  beforeEach(async () => {
    userRepository = {
      findByEmail: jest.fn()
    };

    tokenRepository = {
      countRecentRequests: jest.fn(),
      create: jest.fn()
    };

    exceptions = new ExceptionsServiceStub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestPasswordReset,
        { provide: UserRepository, useValue: userRepository },
        { provide: PasswordResetTokenRepository, useValue: tokenRepository },
        { provide: "ExceptionsAdapter", useValue: exceptions }
      ]
    }).compile();

    service = module.get(RequestPasswordReset);

    jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed-code" as never);
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  it("deve lançar exceção se o usuário não for encontrado", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(service.execute("invalid@example.com")).rejects.toThrow(
      "Usuário não encontrado."
    );
  });

  it("deve lançar exceção se já houver uma solicitação recente", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (tokenRepository.countRecentRequests as jest.Mock).mockResolvedValue(1);

    await expect(service.execute(user.email)).rejects.toThrow(
      "Já existe uma solicitação recente. Aguarde o código expirar."
    );
  });

  it("deve gerar e salvar o token se não houver solicitações recentes", async () => {
    (userRepository.findByEmail as jest.Mock).mockResolvedValue(user);
    (tokenRepository.countRecentRequests as jest.Mock).mockResolvedValue(0);

    await service.execute(user.email);

    expect(tokenRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: user.id,
        tokenHash: "hashed-code"
      })
    );
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Código de recuperação para")
    );
  });
});
