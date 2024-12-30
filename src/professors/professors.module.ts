import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "../auth/auth.service";
import { ProfessorsController } from "./professors.controller";
import { ProfessorService } from "./professors.service";
import { ProfessorSchema } from "./schemas/professor.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Professor", schema: ProfessorSchema }])],
  controllers: [ProfessorsController],
  providers: [ProfessorService, AuthService, JwtService],
  exports: [ProfessorService, MongooseModule]
})
export class ProfessorsModule {}
