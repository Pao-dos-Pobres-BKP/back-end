import {
  CreateDonorDTO,
  CreateDonorResponses
} from "@application/dtos/donor/create";
import { DeleteDonorResponses } from "@application/dtos/donor/delete";
import {
  FindAllDonorsResponse,
  FindAllDonorsResponses
} from "@application/dtos/donor/find-all";
import {
  DonorDetails,
  FindDonorByIdResponses
} from "@application/dtos/donor/find-by-id";
import {
  UpdateDonorDTO,
  UpdateDonorResponses
} from "@application/dtos/donor/update";
import { PaginationDTO } from "@application/dtos/utils/pagination";
import { CreateDonorUseCase } from "@application/use-cases/donor/create";
import { DeleteDonorUseCase } from "@application/use-cases/donor/delete";
import { FindAllDonorsUseCase } from "@application/use-cases/donor/find-all";
import { FindDonorByIdUseCase } from "@application/use-cases/donor/find-by-id";
import { UpdateDonorUseCase } from "@application/use-cases/donor/update";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Donors")
@Controller("donors")
export class DonorController {
  constructor(
    private readonly createDonorUseCase: CreateDonorUseCase,
    private readonly updateDonorUseCase: UpdateDonorUseCase,
    private readonly deleteDonorUseCase: DeleteDonorUseCase,
    private readonly findDonorByIdUseCase: FindDonorByIdUseCase,
    private readonly findAllDonorsUseCase: FindAllDonorsUseCase
  ) {}

  @Post()
  @CreateDonorResponses
  async createDonor(@Body() body: CreateDonorDTO): Promise<void> {
    return await this.createDonorUseCase.execute(body);
  }

  @Get()
  @FindAllDonorsResponses
  async findAllDonors(
    @Query() query: PaginationDTO
  ): Promise<FindAllDonorsResponse> {
    return await this.findAllDonorsUseCase.execute(query);
  }

  @Get(":id")
  @FindDonorByIdResponses
  async findDonorById(@Param("id") id: string): Promise<DonorDetails | void> {
    return await this.findDonorByIdUseCase.execute(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(":id")
  @UpdateDonorResponses
  async updateDonor(
    @Param("id") id: string,
    @Body() body: UpdateDonorDTO
  ): Promise<void> {
    return await this.updateDonorUseCase.execute(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  @DeleteDonorResponses
  async deleteDonor(@Param("id") id: string): Promise<void> {
    return await this.deleteDonorUseCase.execute(id);
  }
}
