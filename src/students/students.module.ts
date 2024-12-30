import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StudentSchema } from "./schemas/student.schema";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Student", schema: StudentSchema }])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService, MongooseModule]
})
export class StudentsModule {}
