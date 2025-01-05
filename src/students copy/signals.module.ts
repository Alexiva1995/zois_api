import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "src/auth/auth.service";
import { SignalsController } from "./signals.controller";
import { SignalService } from "./signals.service";
import { SignalSchema } from "./schemas/signal.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Signals", schema: SignalSchema }]), JwtModule],
  controllers: [SignalsController],
  providers: [SignalService, AuthService],
  exports: [SignalService, MongooseModule]
})
export class SignalsModule {}
