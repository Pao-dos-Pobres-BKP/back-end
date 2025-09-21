import { PartialType } from "@nestjs/swagger";
import { CreateNewsDto } from "./create";

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
