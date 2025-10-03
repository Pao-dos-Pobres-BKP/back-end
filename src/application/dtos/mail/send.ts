import {
  ApiCreatedResponse,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional
} from "@nestjs/swagger";
import { IsString, IsEmail, Length, IsOptional, IsArray } from "class-validator";
import { applyDecorators } from "@nestjs/common";

export class SendEmailDTO {
  @ApiProperty({ description: "Recipient(s) of the email" })
  @IsEmail()
  to: string;

  @ApiProperty({ description: "Subject of the email" })
  @IsString()
  @Length(1, 998)
  subject: string;

  @ApiPropertyOptional({ description: "HTML content of the email" })
  @IsString()
  html: string;

  @ApiPropertyOptional({ description: "CC recipients" })
  @IsOptional()
  cc?: string | string[];

  @ApiPropertyOptional({ description: "BCC recipients" })
  @IsOptional()
  bcc?: string | string[];

  @ApiPropertyOptional({ description: "Reply-to addresses" })
  @IsOptional()
  replyTo?: string | string[];

  @ApiPropertyOptional({ description: "Plain text content of the email" })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiPropertyOptional({ description: "Configuration set name" })
  @IsOptional()
  @IsString()
  configurationSetName?: string;

  @ApiPropertyOptional({ description: "Email tags" })
  @IsOptional()
  @IsArray()
  tags?: Array<{
    name: string;
    value: string;
  }>;

  @ApiPropertyOptional({ description: "Sender email address" })
  @IsOptional()
  @IsEmail()
  from?: string;
}

export const SendEmailResponseDecorator = applyDecorators(
  ApiCreatedResponse({
    description: "Email sent successfully"
  }),
  ApiOperation({ summary: "Send an email" })
);
