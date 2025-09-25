import { ApiProperty } from "@nestjs/swagger";

export class DeleteFileResponse {
  @ApiProperty({
    example: true,
    description: "Indicates if the file was deleted successfully"
  })
  deleted: boolean;
}
