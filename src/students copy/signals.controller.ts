import { Body, Controller, Get, Param, Post, Query, Request } from "@nestjs/common";
import { SignalService } from "./signals.service";
import { CreateSignalDto } from "./dto/create-signal.dto";
import { Types } from "mongoose";

@Controller("signals")
export class SignalsController {
  constructor(private readonly signalService: SignalService) {}

  @Post()
  async createSignal(@Body() signalData: CreateSignalDto) {
    const newSignal = await this.signalService.createSignal({
      ...signalData
    });

    return {
      message: "Signal created successfully",
      signal: newSignal
    };
  }

  @Get("by-professor/:professorId")
  async getSignalsByProfessor(@Query() filters: any, @Param("professorId") professorId: Types.ObjectId) {
    const signals = await this.signalService.findByProfessorWithFilters(professorId, filters);

    return { signals };
  }
}
