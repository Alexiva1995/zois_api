import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/auth/roles/roles.enum";
import { AuthService } from "../auth/auth.service";
import { User } from "./../users/interfaces/user.interface";
import { CreateUserDto } from "./dto/create-professor.dto";
import { ProfessorService } from "./professors.service";
import { StudentsService } from "src/students/students.service";
import { SignalService } from "src/students copy/signals.service";
import { Request as Req } from "@nestjs/common";

@ApiTags("professors")
@Controller("professors")
export class ProfessorsController {
  constructor(
    private readonly professorService: ProfessorService,
    private readonly studentService: StudentsService,
    private readonly signalService: SignalService
  ) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: "The user has been successfully created." })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "User already exists." })
  // @Roles(UserRole.ADMIN)
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.professorService.findOneByEmail(createUserDto.email);
    if (user) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
    const createdUser = (await this.professorService.create(createUserDto)) as User;
    return { user: createdUser };
  }

  @Delete(":professorId/unsubscribe/:studentId")
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  async unsubscribeStudent(
    @Param("professorId") professorId: string,
    @Param("studentId") studentId: string
  ): Promise<void> {
    await this.professorService.unsubscribeStudent(professorId, studentId);
  }

  @Get("dashboard/:professorId")
  async getProfessorDashboard(@Param("professorId") professorId: string, @Query() filters: any) {
    // Valida si `professorId` es un ObjectId válido
    if (!this.isValidObjectId(professorId)) {
      return {
        professor: null,
        latestStudents: [],
        latestSignals: []
      };
    }

    try {
      const professor = await this.professorService.findById(professorId);
      const latestStudents = (await this.studentService.findLatestByProfessor(professorId, 3)) || [];
      const latestSignals = (await this.signalService.findByProfessorWithFilters(professorId, filters)) || [];

      return {
        professor,
        latestStudents,
        latestSignals
      };
    } catch (error) {
      console.error("Error in getProfessorDashboard:", error);
      return {
        professor: null,
        latestStudents: [],
        latestSignals: []
      };
    }
  }

  // Método para validar si un ID es un ObjectId válido
  private isValidObjectId(id: string): boolean {
    const ObjectId = require("mongoose").Types.ObjectId;
    return ObjectId.isValid(id);
  }
}
