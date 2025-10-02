import { Test, TestingModule } from "@nestjs/testing";
import { ResetPassword } from "./reset-password";
import { DonorRepository } from "@domain/repositories/donor";
import { AdminRepository } from "@domain/repositories/admin";
import { PasswordResetTokenRepository } from "@domain/repositories/password-reset";
import { ExceptionsServiceStub } from "test/stubs/adapters/exceptions";
import * as bcrypt from "bcryptjs";

describe("ResetPassword", () => {
  let service: ResetPassword;
  let donorRepository: Partial<DonorRepository>;
  let adminRepository: Partial<AdminRepository>;
  let tokenRepository: Partial<PasswordResetTokenRepository>;
  let exceptions: ExceptionsServiceStub;

  const email = "test@example.com";
  const donorUser = { id: "user-1", email };
  const adminUser = { id: "user-2", email };
  const validToken = {
    id: "token-123",
    expiresAt: new Date(Date.now() + 5 * 60 * 1000)
  };

  beforeEach(async () => {
    donorRepository = {
      findByEmail: jest.fn(),
      update: jest.fn()
    };

    adminRepository = {
      findByEmail: jest.fn(),
      update: jest.fn()
    };

    tokenRepository = {
      findLatestValidTokenByUserId: jest.fn(),
      markAsUsed: jest.fn()
    };

    exceptions = new ExceptionsServiceStub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPassword,
        { provide: DonorRepository, useValue: donorRepository },
        { provide: AdminRepository, useValue: adminRepository },
        { provide: PasswordResetTokenRepository, useValue: tokenRepository },
        { provide: "ExceptionsAdapter", useValue: exceptions }
      ]
    }).compile();

    service = module.get(ResetPassword);

    jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed-password" as never);
  });

  it("deve lançar exceção se o usuário não for encontrado", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (adminRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(
      service.execute({ email, newPassword: "newpass123" })
    ).rejects.toThrow("Usuário não encontrado.");
  });

  it("deve lançar exceção se nenhum token válido for encontrado", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(donorUser);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(null);

    await expect(
      service.execute({ email, newPassword: "newpass123" })
    ).rejects.toThrow("Nenhum código de recuperação válido encontrado.");
  });

  it("deve lançar exceção se o token estiver expirado", async () => {
    const expiredToken = { ...validToken, expiresAt: new Date(Date.now() - 1) };

    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(donorUser);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(expiredToken);

    await expect(
      service.execute({ email, newPassword: "newpass123" })
    ).rejects.toThrow("O código de recuperação expirou.");
  });

  it("deve atualizar a senha do donor e marcar token como usado", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(donorUser);
    (adminRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(validToken);

    await service.execute({ email, newPassword: "newpass123" });

    expect(donorRepository.update).toHaveBeenCalledWith(donorUser.id, {
      password: "hashed-password"
    });
    expect(tokenRepository.markAsUsed).toHaveBeenCalledWith(validToken.id);
  });

  it("deve atualizar a senha do admin e marcar token como usado", async () => {
    (donorRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (adminRepository.findByEmail as jest.Mock).mockResolvedValue(adminUser);
    (
      tokenRepository.findLatestValidTokenByUserId as jest.Mock
    ).mockResolvedValue(validToken);

    await service.execute({ email, newPassword: "adminPass123" });

    expect(adminRepository.update).toHaveBeenCalledWith(adminUser.id, {
      password: "hashed-password"
    });
    expect(tokenRepository.markAsUsed).toHaveBeenCalledWith(validToken.id);
  });
});
