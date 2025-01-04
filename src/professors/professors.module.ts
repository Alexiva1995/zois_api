import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "../auth/auth.service";
import { ProfessorsController } from "./professors.controller";
import { ProfessorService } from "./professors.service";
import { ProfessorSchema } from "./schemas/professor.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Professor", schema: ProfessorSchema }]), JwtModule],
  controllers: [ProfessorsController],
  providers: [ProfessorService, AuthService],
  exports: [ProfessorService, MongooseModule]
})
export class ProfessorsModule {}
