import { Roles } from "src/auth/decorators/roles.decorator";
import { Controller, Patch, Param, UseGuards } from "@nestjs/common";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { StudentsService } from "./students.service";
import { UserRole } from "src/auth/roles/roles.enum";

@Controller("students")
@UseGuards(RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Patch(":studentId/follow/:professorId")
  @Roles(UserRole.STUDENT) // Solo estudiantes pueden seguir
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
}
