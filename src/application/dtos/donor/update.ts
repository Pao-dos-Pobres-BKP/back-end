import { PartialType } from "@nestjs/swagger";
import { CreateDonorDTO } from "./create";

export class UpdateDonorDTO extends PartialType(CreateDonorDTO) {}
