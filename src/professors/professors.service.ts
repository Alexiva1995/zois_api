
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-professor.dto";
import { Professor } from "./interfaces/professor.interface";
@Injectable()
export class ProfessorService {
  constructor(
    @InjectModel("Professor") private readonly userModel: Model<Professor>,

  ) {}

  async create(createUserDto: CreateUserDto): Promise<Professor> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOneByEmail(email: string): Promise<Professor> {
    const professor = await this.userModel.findOne({ email }).exec();
    return professor;
  }

  async enrollStudent(professorId: string, studentId: string): Promise<void> {
    const professor = await this.userModel.findOne({ professorId });
    if (!professor) {
      throw new Error("Professor not found");
    }

    if (!professor.enrolledStudents.includes(studentId)) {
      professor.enrolledStudents.push(studentId);
      await professor.save();
    }
  }

  async unsubscribeStudent(professorId: string, studentId: string): Promise<void> {
    const professor = await this.userModel.findOne({ professorId });

    if (!professor) {
      throw new Error('Professor not found');
    }

    const studentIndex = professor.enrolledStudents.indexOf(studentId);
    if (studentIndex === -1) {
      throw new Error('Student not enrolled with this professor');
    }

    // Eliminar al estudiante de la lista
    professor.enrolledStudents.splice(studentIndex, 1);
    await professor.save();
  }
}
