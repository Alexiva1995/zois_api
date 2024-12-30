import { Body, Controller, Delete, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/auth/roles/roles.enum";
import { AuthService } from "../auth/auth.service";
import { User } from "./../users/interfaces/user.interface";
import { CreateUserDto } from "./dto/create-professor.dto";
import { ProfessorService } from "./professors.service";

@ApiTags("professors")
@Controller("professors")
export class ProfessorsController {
  constructor(
    private readonly professorService: ProfessorService,
    private readonly authService: AuthService
  ) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: "The user has been successfully created." })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "User already exists." })
  @Roles(UserRole.ADMIN)
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.professorService.findOneByEmail(createUserDto.email);
    if (user) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
    const createdUser = (await this.professorService.create(createUserDto)) as User;
    const token = await this.authService.createToken(createdUser);
    return { user: createdUser, token };
  }

  @Delete(":professorId/unsubscribe/:studentId")
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  async unsubscribeStudent(
    @Param("professorId") professorId: string,
    @Param("studentId") studentId: string
  ): Promise<void> {
    await this.professorService.unsubscribeStudent(professorId, studentId);
  }
}
