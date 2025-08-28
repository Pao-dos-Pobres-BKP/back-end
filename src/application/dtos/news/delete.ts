import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class DeleteNewsDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  id!: string;
}
