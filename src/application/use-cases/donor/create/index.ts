import { CreateDonorDTO } from "@application/dtos/donor/create";
import { ExceptionsAdapter } from "@domain/adapters/exception";
import { HashAdapter } from "@domain/adapters/hash";
import { TransactionAdapter } from "@domain/adapters/transaction";
import { UserRole } from "@domain/entities/user-role-enum";
import { DonorRepository } from "@domain/repositories/donor";
import { UserRepository } from "@domain/repositories/user";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateDonorUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly donorRepository: DonorRepository,
    private readonly hashService: HashAdapter,
    private readonly exceptionService: ExceptionsAdapter,
    private readonly transactionService: TransactionAdapter
  ) {}

  async execute({
    birthDate,
    cpf,
    email,
    fullName,
    gender,
    password,
    phone
  }: CreateDonorDTO): Promise<void> {
    const emailAlreadyUsed = await this.userRepository.findByEmail(email);

    if (emailAlreadyUsed) {
      return this.exceptionService.conflict({
        message: "Email already used"
      });
    }

    const cpfAlreadyUsed = await this.donorRepository.findByCPF(cpf);

    if (cpfAlreadyUsed) {
      return this.exceptionService.conflict({
        message: "CPF already used"
      });
    }

    if (birthDate <= new Date()) {
      return this.exceptionService.badRequest({
        message: "Birth date must be before than today"
      });
    }

    const passwordHashed = await this.hashService.generateHash(password);

    await this.transactionService.transaction(async (tx) => {
      await this.userRepository.create(
        {
          email,
          password: passwordHashed,
          role: UserRole.DONOR
        },
        tx
      );

      await this.donorRepository.create(
        {
          birthDate,
          cpf,
          fullName,
          gender,
          phone
        },
        tx
      );
    });
  }
}
