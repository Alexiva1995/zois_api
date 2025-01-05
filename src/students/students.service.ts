import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student } from "./interfaces/student.interface";
import { CreateStudentDto } from "./dto/create-student.dto";
@Injectable()
export class StudentsService {
  constructor(@InjectModel("Student") private readonly userModel: Model<Student>) {}

  async findOneByEmail(email: string): Promise<Student> {
    const professor = await this.userModel.findOne({ email }).exec();
    return professor;
  }

  async unfollowProfessor(studentId: string, professorId: string): Promise<void> {
    const student = await this.userModel.findById(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    const professorIndex = student.followedProfessors.indexOf(professorId);
    if (professorIndex === -1) {
      throw new Error("Student is not following this professor");
    }

    student.followedProfessors.splice(professorIndex, 1);
    await student.save();
  }

  async followProfessor(studentId: string, professorId: string): Promise<void> {
    const student = await this.userModel.findById(studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    if (!student.followedProfessors.includes(professorId)) {
      student.followedProfessors.push(professorId);
      await student.save();
    } else {
      throw new Error("Student is already following this professor");
    }
  }

  async create(createUserDto: CreateStudentDto): Promise<Student> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findLatestByProfessor(professorId: string, limit: number): Promise<Student[]> {
    return this.userModel.find({
      where: { professorId },
      order: { createdAt: "DESC" },
      take: limit
    });
  }
}
