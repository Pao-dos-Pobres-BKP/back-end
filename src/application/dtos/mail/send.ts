import {
  ApiCreatedResponse,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional
} from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsString,
  IsEmail,
  ArrayNotEmpty,
  IsOptional,
  Length,
  IsArray,
  ValidateNested
} from "class-validator";
import { Transform } from "class-transformer";
import { applyDecorators } from "@nestjs/common";

export class EmailTagDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  value: string;
}

export class SendEmailDTO {
  @ApiProperty({ type: [String], description: "Recipient(s) of the email" })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsEmail({}, { each: true })
  @ArrayNotEmpty()
  to: string[];

  @ApiPropertyOptional({ type: [String], description: "CC recipient(s)" })
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined ? undefined : Array.isArray(value) ? value : [value]
  )
  @IsEmail({}, { each: true })
  cc?: string[] | undefined;

  @ApiPropertyOptional({ type: [String], description: "BCC recipient(s)" })
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined ? undefined : Array.isArray(value) ? value : [value]
  )
  @IsEmail({}, { each: true })
  bcc?: string[] | undefined;

  @ApiProperty({ description: "Subject of the email" })
  @IsString()
  @Length(1, 998)
  subject: string;

  @ApiPropertyOptional({ description: "HTML content of the email" })
  @IsOptional()
  @IsString()
  html?: string;

  @ApiPropertyOptional({ description: "Text content of the email" })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ type: [String], description: "Reply-to address(es)" })
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined ? undefined : Array.isArray(value) ? value : [value]
  )
  @IsEmail({}, { each: true })
  replyTo?: string[] | undefined;

  @ApiPropertyOptional({
    type: [Object],
    description: "Tags for analytics/config sets",
    example: [{ name: "tagName", value: "tagValue" }]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EmailTagDTO)
  tags?: EmailTagDTO[] | undefined;

  @ApiPropertyOptional({ description: "Configuration set name" })
  @IsOptional()
  @IsString()
  configurationSetName?: string;
}

export const SendEmailResponseDecorator = applyDecorators(
  ApiCreatedResponse({
    description: "Email sent successfully"
  }),
  ApiOperation({ summary: "Send an email" })
);
