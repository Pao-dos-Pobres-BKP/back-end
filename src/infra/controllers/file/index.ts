import {
  CreateFileDTO,
  CreateFileResponse
} from "@application/dtos/file/create";
import { DeleteFileResponse } from "@application/dtos/file/delete";
import { FindFileByIdResponse } from "@application/dtos/file/file-by-id";
import { CreateFileUseCase } from "@application/use-cases/file/create/create-file";
import { DeleteFileUseCase } from "@application/use-cases/file/delete/delete-file";
import { FindFileByIdUseCase } from "@application/use-cases/file/find-by-id/find-file-by-id";
import { Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Files")
@Controller("files")
export class FileController {
  constructor(
    private readonly createFileUseCase: CreateFileUseCase,
    private readonly deleteFileUseCase: DeleteFileUseCase,
    private readonly findFileByIdUseCase: FindFileByIdUseCase
  ) {}

  @Post()
  async createFile(@Query() query: CreateFileDTO): Promise<CreateFileResponse> {
    return await this.createFileUseCase.execute(query);
  }

  @Get(":id")
  async getFileById(@Param("id") id: string): Promise<FindFileByIdResponse> {
    return await this.findFileByIdUseCase.execute(id);
  }

  @Delete(":id")
  async deleteFile(@Param("id") id: string): Promise<DeleteFileResponse> {
    return await this.deleteFileUseCase.execute(id);
  }
}
