import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SendEmailDTO {
  @ApiProperty({ type: [String], description: "Recipient(s) of the email" })
  to: string | string[];

  @ApiPropertyOptional({ type: [String], description: "CC recipient(s)" })
  cc?: string | string[];

  @ApiPropertyOptional({ type: [String], description: "BCC recipient(s)" })
  bcc?: string | string[];

  @ApiProperty({ description: "Subject of the email" })
  subject: string;

  @ApiPropertyOptional({ description: "HTML content of the email" })
  html?: string;

  @ApiPropertyOptional({ description: "Text content of the email" })
  text?: string;

  @ApiPropertyOptional({ type: [String], description: "Reply-to address(es)" })
  replyTo?: string | string[];

  @ApiPropertyOptional({
    type: [Object],
    description: "Tags for analytics/config sets",
    example: [{ name: "tagName", value: "tagValue" }]
  })
  tags?: { name: string; value: string }[];

  @ApiPropertyOptional({ description: "Configuration set name" })
  configurationSetName?: string;
}
