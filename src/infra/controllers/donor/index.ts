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
  UpdateDonorAvatarResponses,
  UpdateDonorDTO,
  UpdateDonorResponses
} from "@application/dtos/donor/update";
import { PaginationDTO } from "@application/dtos/utils/pagination";
import { CreateDonorUseCase } from "@application/use-cases/donor/create/create-donor";
import { DeleteDonorUseCase } from "@application/use-cases/donor/delete/delete-donor";
import { FindAllDonorsUseCase } from "@application/use-cases/donor/find-all/find-all-donors";
import { FindDonorByIdUseCase } from "@application/use-cases/donor/find-by-id/find-donor-by-id";
import { UpdateDonorUseCase } from "@application/use-cases/donor/update/update-donor";
import { UpdateDonorAvatarUseCase } from "@application/use-cases/donor/update-avatar/update-avatar";
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
  Query,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { ApiTags, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateFileDTO } from "@application/dtos/file/create";

@ApiTags("Donors")
@Controller("donors")
export class DonorController {
  constructor(
    private readonly createDonorUseCase: CreateDonorUseCase,
    private readonly updateDonorUseCase: UpdateDonorUseCase,
    private readonly updateDonorAvatarUseCase: UpdateDonorAvatarUseCase,
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
  @Patch(":id/avatar")
  @UpdateDonorAvatarResponses
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary"
        }
      }
    }
  })
  async updateDonorAvatar(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    const body: CreateFileDTO = {
      buffer: file.buffer,
      mimetype: file.mimetype,
      originalname: file.originalname
    };
    return await this.updateDonorAvatarUseCase.execute(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  @DeleteDonorResponses
  async deleteDonor(@Param("id") id: string): Promise<void> {
    return await this.deleteDonorUseCase.execute(id);
  }
}
