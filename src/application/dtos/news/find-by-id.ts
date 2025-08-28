import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class FindNewsByIdDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  id!: string;
}
