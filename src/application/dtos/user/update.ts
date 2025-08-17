import { PartialType } from "@nestjs/swagger";
import { CreateUserDTO } from "./create";

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
