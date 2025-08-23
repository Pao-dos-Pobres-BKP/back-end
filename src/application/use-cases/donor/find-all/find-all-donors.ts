import { FindAllDonorsResponse } from "@application/dtos/donor/find-all";
import { PaginationDTO } from "@application/dtos/utils/pagination";
import { DonorRepository } from "@domain/repositories/donor";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllDonorsUseCase {
  constructor(private readonly donorRepository: DonorRepository) {}

  async execute({
    page,
    pageSize
  }: PaginationDTO): Promise<FindAllDonorsResponse> {
    return await this.donorRepository.findAll({
      page,
      pageSize
    });
  }
}
