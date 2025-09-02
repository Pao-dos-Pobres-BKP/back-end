import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  PartialType,
  ApiPropertyOptional,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse
} from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";
import { CreateAdminDto } from "./create";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @ApiPropertyOptional({
    example: false,
    description: "Is a root admin"
  })
  @IsOptional()
  @IsBoolean()
  root?: boolean;
}

export const UpdateAdminResponses = applyDecorators(
  ApiNoContentResponse({
    description: "Admin updated successfully"
  }),
  ApiNotFoundResponse({
    description: "Admin not found"
  }),
  ApiUnauthorizedResponse({
    description: "Unauthorized - Invalid or missing token"
  }),
  ApiForbiddenResponse({
    description: "Forbidden - Only admins can update other admins"
  })
);
