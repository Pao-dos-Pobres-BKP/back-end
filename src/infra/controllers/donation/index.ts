import {
  CreateDonationDTO,
  CreateDonationResponses
} from "@application/dtos/donation/create";
import { DeleteDonationResponses } from "@application/dtos/donation/delete";
import {
  FindAllDonationsResponse,
  FindAllDonationsResponses
} from "@application/dtos/donation/find-all";
import {
  DonationDetails,
  FindDonationByIdResponses
} from "@application/dtos/donation/find-by-id";
import {
  UpdateDonationDTO,
  UpdateDonationResponses
} from "@application/dtos/donation/update";
import { PaginationDTO } from "@application/dtos/utils/pagination";
import { CreateDonationUseCase } from "@application/use-cases/donation/create/create-donation";
import { DeleteDonationUseCase } from "@application/use-cases/donation/delete/delete-donation";
import { FindAllDonationsUseCase } from "@application/use-cases/donation/find-all/find-all-donations";
import { FindDonationByIdUseCase } from "@application/use-cases/donation/find-by-id/find-donation-by-id";
import { UpdateDonationUseCase } from "@application/use-cases/donation/update/update-donation";
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
import { ApiTags, ApiQuery } from "@nestjs/swagger";

@ApiTags("Donations")
@Controller("donations")
export class DonationController {
  constructor(
    private readonly createDonationUseCase: CreateDonationUseCase,
    private readonly updateDonationUseCase: UpdateDonationUseCase,
    private readonly deleteDonationUseCase: DeleteDonationUseCase,
    private readonly findDonationByIdUseCase: FindDonationByIdUseCase,
    private readonly findAllDonationsUseCase: FindAllDonationsUseCase
  ) {}

  @Post()
  @CreateDonationResponses
  async createDonation(@Body() body: CreateDonationDTO): Promise<void> {
    return await this.createDonationUseCase.execute(body, body.donorId);
  }

  @Get()
  @ApiQuery({ name: "donorId", required: true, type: String })
  @FindAllDonationsResponses
  async findAllDonations(
    @Query() query: PaginationDTO & { donorId?: string }
  ): Promise<FindAllDonationsResponse> {
    return await this.findAllDonationsUseCase.execute(query);
  }

  @Get(":id")
  @FindDonationByIdResponses
  async findDonationById(
    @Param("id") id: string,
    @Query("donorId") donorId?: string
  ): Promise<DonationDetails | void> {
    return await this.findDonationByIdUseCase.execute(id, donorId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(":id")
  @UpdateDonationResponses
  async updateDonation(
    @Param("id") id: string,
    @Body() body: UpdateDonationDTO,
    @Query("donorId") donorId?: string
  ): Promise<void> {
    return await this.updateDonationUseCase.execute(id, body, donorId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  @DeleteDonationResponses
  async deleteDonation(
    @Param("id") id: string,
    @Query("donorId") donorId?: string
  ): Promise<void> {
    return await this.deleteDonationUseCase.execute(id, donorId);
  }
}
