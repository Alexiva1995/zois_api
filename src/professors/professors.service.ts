
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
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

  async enrollStudent(professorId: string, studentId: Types.ObjectId): Promise<void> {

    const professor = await this.userModel.findOne({ professorId: professorId });
    if (!professor) {
      throw new Error("Professor not found");
    }

    const studentIndex = professor.enrolledStudents.findIndex(
      (enrollment) => enrollment.studentId.toString() === studentId.toString()
    );

    if (studentIndex === -1) {
      professor.enrolledStudents.push({
        studentId: studentId,
        subscriptionDate: new Date()
      });

      await professor.save();
    } else {
      console.log("Student already enrolled");
    }
  }
  async unsubscribeStudent(professorId: string, studentId: Types.ObjectId): Promise<void> {
    const professor = await this.userModel.findOne({
      where: { professorId: professorId },
    });

    if (!professor) {
      throw new Error('Professor not found');
    }

    const studentIndex = professor.enrolledStudents.findIndex(
      (enrollment) => enrollment.studentId === studentId
    );
    if (studentIndex === -1) {
      throw new Error('Student not enrolled with this professor');
    }

    // Eliminar al estudiante de la lista
    professor.enrolledStudents.splice(studentIndex, 1);
    await professor.save();
  }

  async findById(professorId: Types.ObjectId): Promise<Professor> {
    return this.userModel.findById(professorId).exec();
  }
}
