import {
  CreateAdminDto,
  CreateAdminResponses
} from "@application/dtos/admin/create";
import { DeleteAdminResponses } from "@application/dtos/admin/delete";
import {
  FindAllAdminsResponse,
  FindAllAdminsResponses
} from "@application/dtos/admin/find-all";
import {
  AdminDetails,
  FindAdminByIdResponses
} from "@application/dtos/admin/find-by-id";
import {
  UpdateAdminDto,
  UpdateAdminResponses
} from "@application/dtos/admin/update";
import { PaginationDTO } from "@application/dtos/utils/pagination";
import { CreateAdminUseCase } from "@application/use-cases/admin/create/create-admin";
import { DeleteAdminUseCase } from "@application/use-cases/admin/delete/delete-admin";
import { FindAllAdminsUseCase } from "@application/use-cases/admin/find-all/find-all-admins.";
import { FindAdminByIdUseCase } from "@application/use-cases/admin/find-by-id/find-admin-by-id";
import { UpdateAdminUseCase } from "@application/use-cases/admin/update/update-admin";
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

@ApiTags("Admins")
@Controller("admins")
export class AdminController {
  constructor(
    private readonly createAdminUseCase: CreateAdminUseCase,
    private readonly updateAdminUseCase: UpdateAdminUseCase,
    private readonly deleteAdminUseCase: DeleteAdminUseCase,
    private readonly findAdminByIdUseCase: FindAdminByIdUseCase,
    private readonly findAllAdminsUseCase: FindAllAdminsUseCase
  ) {}

  @Post()
  @CreateAdminResponses
  async createAdmin(@Body() body: CreateAdminDto): Promise<void> {
    return await this.createAdminUseCase.execute(body);
  }

  @Get()
  @FindAllAdminsResponses
  async findAllAdmins(
    @Query() query: PaginationDTO
  ): Promise<FindAllAdminsResponse> {
    return await this.findAllAdminsUseCase.execute(query);
  }

  @Get(":id")
  @FindAdminByIdResponses
  async findAdminById(@Param("id") id: string): Promise<AdminDetails | void> {
    return await this.findAdminByIdUseCase.execute(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(":id")
  @UpdateAdminResponses
  async updateAdmin(
    @Param("id") id: string,
    @Body() body: UpdateAdminDto
  ): Promise<void> {
    return await this.updateAdminUseCase.execute(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  @DeleteAdminResponses
  async deleteAdmin(@Param("id") id: string): Promise<void> {
    return await this.deleteAdminUseCase.execute(id);
  }
}
