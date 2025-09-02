import { ExceptionsAdapter } from "@domain/adapters/exception";
import { AdminRepository } from "@domain/repositories/admin";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteAdminUseCase {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly exceptionService: ExceptionsAdapter
  ) {}

  async execute(id: string): Promise<void> {
    const admin = await this.adminRepository.findById(id);

    if (!admin) {
      return this.exceptionService.notFound({
        message: "Admin not found"
      });
    }

    await this.adminRepository.delete(id);
  }
}
