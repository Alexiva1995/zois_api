import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import * as dotenv from "dotenv";
import { AuthModule } from "./auth/auth.module";
import { RolesGuard } from "./auth/guards/roles.guard";
import { FilesModule } from "./files/files.module";
import { ProfessorsModule } from "./professors/professors.module";
import { ProfessorService } from "./professors/professors.service";
import { StudentsModule } from "./students/students.module";
import { StudentsService } from "./students/students.service";
import { UnsplashController } from "./unsplash/unsplash.controller";
import { UnsplashModule } from "./unsplash/unsplash.module";
import { UnsplashService } from "./unsplash/unsplash.service";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    StudentsModule,
    ProfessorsModule,
    AuthModule,
    UnsplashModule,
    FilesModule,
    ProfessorsModule
  ],
  controllers: [UnsplashController],
  providers: [
    UnsplashService,
    UsersService,
    ProfessorService,
    StudentsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
