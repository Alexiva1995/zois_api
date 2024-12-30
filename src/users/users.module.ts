import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthService } from "../auth/auth.service";
import { StudentsModule } from "./../students/students.module";
import { UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { ProfessorsModule } from "src/professors/professors.module";
import { AdminSchema } from "./schemas/admin.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Admin", schema: AdminSchema }
    ]),
    StudentsModule,
    ProfessorsModule
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService],
  exports: [UsersService, MongooseModule]
})
export class UsersModule {}
