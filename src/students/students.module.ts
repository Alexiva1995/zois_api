import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "src/auth/auth.service";
import { StudentSchema } from "./schemas/student.schema";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Student", schema: StudentSchema }]), JwtModule],
  controllers: [StudentsController],
  providers: [StudentsService, AuthService],
  exports: [StudentsService, MongooseModule]
})
export class StudentsModule {}
