import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, Length } from "class-validator";

export class FindNewsByIdDto {
  @ApiProperty({
    description: "News ID (CUID format, 25 characters)",
    example: "ckzyf6h4h0000r5x9a7h2d9lz",
  })
  @IsString({ message: "The ID must be a string" })
  @IsNotEmpty({ message: "The ID is required" })
  @Length(25, 25, { message: "The ID must be exactly 25 characters long" })
  @Matches(/^[a-z0-9]+$/, {
    message: "The ID must contain only lowercase letters and numbers",
  })
  id: string;
}
