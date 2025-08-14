import {
  CreateUserDTO,
  CreateUserResponses,
  UserWithoutPassword
} from "@application/dtos/user/create";
import { DeleteUserResponses } from "@application/dtos/user/delete";
import { FindAllUserResponses } from "@application/dtos/user/find-all";
import { FindByIdUserResponses } from "@application/dtos/user/find-by-id";
import {
  UpdateUserResponses,
  UpdateUserDTO
} from "@application/dtos/user/update";
import { PaginationDTO } from "@application/dtos/utils/pagination";
import { CreateUserUseCase } from "@application/use-cases/user/create";
import { DeleteUserUseCase } from "@application/use-cases/user/delete";
import { FindAllUserUseCase } from "@application/use-cases/user/find-all";
import { FindByIdUserUseCase } from "@application/use-cases/user/find-by-id";
import { UpdateUserUseCase } from "@application/use-cases/user/update";
import { PaginatedEntity } from "@domain/constants/pagination";
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

@Controller("user")
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  @Post()
  @CreateUserResponses
  async create(
    @Body() body: CreateUserDTO
  ): Promise<UserWithoutPassword | void> {
    return await this.createUserUseCase.execute(body);
  }

  @Get()
  @FindAllUserResponses
  async findAll(
    @Query() query: PaginationDTO
  ): Promise<PaginatedEntity<UserWithoutPassword>> {
    return await this.findAllUserUseCase.execute(query);
  }

  @Get(":id")
  @FindByIdUserResponses
  async findById(@Param("id") id: string): Promise<UserWithoutPassword | void> {
    return await this.findByIdUserUseCase.execute(id);
  }

  @Patch(":id")
  @UpdateUserResponses
  async update(
    @Param("id") id: string,
    @Body() body: UpdateUserDTO
  ): Promise<UserWithoutPassword | void> {
    return await this.updateUserUseCase.execute(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  @DeleteUserResponses
  async delete(@Param("id") id: string): Promise<void> {
    return await this.deleteUserUseCase.execute(id);
  }
}
