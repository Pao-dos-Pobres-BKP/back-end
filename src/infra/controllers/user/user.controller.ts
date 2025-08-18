import { CreateUserDTO } from "@application/dtos/donor/create";
import { UpdateUserDTO } from "@application/dtos/donor/update";
import { UserUseCase } from "@application/use-cases/user/user.use-case";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "@domain/entities/donor";
import { Query } from "@nestjs/common";
import { PaginationParams } from "@domain/constants/pagination";
import { PaginatedEntity } from "@domain/constants/pagination";

@Controller("user")
@ApiTags("User")
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @ApiOperation({
    summary: "Create user",
    description: "Create a new user"
  })
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created."
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request"
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error"
  })
  @Post()
  async create(@Body() body: CreateUserDTO): Promise<User> {
    const createUser = await this.userUseCase.createUser(body);

    return createUser;
  }

  @Get()
  @ApiOperation({
    summary: "List all users paginated",
    description: "List all users paginated"
  })
  async findAllPaginated(
    @Query() pagination: PaginationParams
  ): Promise<PaginatedEntity<User>> {
    const { page, pageSize } = pagination;
    return await this.userUseCase.findAllPaginated({
      page,
      pageSize
    });
  }

  @ApiOperation({
    summary: "Find user by id",
    description: "Find user by id"
  })
  @ApiResponse({
    status: 200,
    description: "The record has been successfully created."
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request"
  })
  @ApiResponse({
    status: 404,
    description: "Not Found"
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error"
  })
  @Get(":id")
  async findById(@Param("id") id: string): Promise<User> {
    return await this.userUseCase.findUserById(id);
  }

  @ApiOperation({
    summary: "Find user by id",
    description: "Find user by id"
  })
  @ApiResponse({
    status: 200,
    description: "The record has been successfully updated."
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request"
  })
  @ApiResponse({
    status: 404,
    description: "Not Found"
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error"
  })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() body: UpdateUserDTO
  ): Promise<User | void> {
    return await this.userUseCase.updateUser(id, body);
  }

  @ApiOperation({
    summary: "Delete user by id",
    description: "Delete user by id"
  })
  @ApiResponse({
    status: 204,
    description: "The record has been successfully deleted."
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request"
  })
  @ApiResponse({
    status: 404,
    description: "Not Found"
  })
  @ApiResponse({
    status: 500,
    description: "Internal Server Error"
  })
  @Delete(":id")
  async remove(@Param("id") id: string): Promise<boolean> {
    return await this.userUseCase.deleteUser(id);
  }
}
