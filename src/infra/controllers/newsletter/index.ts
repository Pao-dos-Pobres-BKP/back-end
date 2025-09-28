import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import {
  CreateNewsletterDto,
  CreateNewsletterResponse
} from "@application/dtos/newsletter/create";
import { CreateNewsletterUseCase } from "@application/use-cases/newsletter/create/create-newsletter";

@ApiTags("Newsletter")
@Controller("newsletter")
export class NewsletterController {
  constructor(
    private readonly createNewsletterUseCase: CreateNewsletterUseCase
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Inscrição na newsletter" })
  @ApiResponse({
    status: 201,
    description: "Inscrição realizada com sucesso"
  })
  @ApiResponse({
    status: 409,
    description: "Email já inscrito na newsletter"
  })
  async subscribe(
    @Body() body: CreateNewsletterDto
  ): Promise<CreateNewsletterResponse> {
    return await this.createNewsletterUseCase.execute(body);
  }
}
