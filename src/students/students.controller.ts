import { User } from "./../users/interfaces/user.interface";
import { CreateUserDto } from "./../users/dto/create-user.dto";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { ApiOperation } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Controller, Patch, Param, UseGuards, Post, HttpStatus, Body, HttpException } from "@nestjs/common";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { StudentsService } from "./students.service";
import { UserRole } from "src/auth/roles/roles.enum";
import { CreateStudentDto } from "./dto/create-student.dto";
import { AuthService } from "src/auth/auth.service";

@Controller("students")
@UseGuards(RolesGuard)
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly authService: AuthService
  ) {}

  @Patch(":studentId/follow/:professorId")
  @Roles(UserRole.STUDENT)
  async followProfessor(
    @Param("studentId") studentId: string,
    @Param("professorId") professorId: string
  ): Promise<void> {
    await this.studentsService.followProfessor(studentId, professorId);
  }

  @Patch(":studentId/unfollow/:professorId")
  @Roles(UserRole.STUDENT) // Solo estudiantes pueden dejar de seguir
  async unfollowProfessor(
    @Param("studentId") studentId: string,
    @Param("professorId") professorId: string
  ): Promise<void> {
    await this.studentsService.unfollowProfessor(studentId, professorId);
  }

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: "The user has been successfully created." })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "User already exists." })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.studentsService.findOneByEmail(createUserDto.email);
    if (user) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
    const createdUser = (await this.studentsService.create(createUserDto)) as User;
    const token = await this.authService.createToken(createdUser);
    return { user: createdUser, token };
  }
}
