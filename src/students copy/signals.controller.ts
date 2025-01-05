import { Body, Controller, Get, Param, Post, Query, Request } from "@nestjs/common";
import { SignalService } from "./signals.service";

@Controller("signals")
export class SignalsController {
  constructor(private readonly signalService: SignalService) {}

  @Post()
  async createSignal(@Body() signalData: any, @Request() req: any) {
    const professorId = req.user.id;

    const newSignal = await this.signalService.createSignal({
      ...signalData,
      professorId
    });

    return {
      message: "Signal created successfully",
      signal: newSignal
    };
  }

  @Get("by-professor/:professorId")
  async getSignalsByProfessor(@Query() filters: any, @Param("professorId") professorId: string) {
    const signals = await this.signalService.findByProfessorWithFilters(professorId, filters);

    return { signals };
  }
}
