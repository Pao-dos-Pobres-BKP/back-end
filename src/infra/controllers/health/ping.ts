import { PingResponses } from "@application/dtos/health/ping";
import { PingResponse, PingUseCase } from "@application/use-cases/health/ping";
import { Controller, Get } from "@nestjs/common";

@Controller("ping")
export class PingController {
  constructor(private readonly pingUseCase: PingUseCase) {}

  @Get()
  @PingResponses
  async execute(): Promise<PingResponse> {
    return this.pingUseCase.execute();
  }
}
