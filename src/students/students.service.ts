import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Student } from "./interfaces/student.interface";
import { CreateStudentDto } from "./dto/create-student.dto";
import { Professor } from "src/professors/interfaces/professor.interface";
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

  async findLatestByProfessor(professor: Professor, limit: number): Promise<Partial<Student[]>> {
    const studentIds = professor.enrolledStudents.map(enrollment => enrollment.studentId);
    const students = await this.userModel
      .find({ _id: { $in: studentIds } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    return students.map(student => {
      const enrollment = professor.enrolledStudents.find(
        enrollment => enrollment.studentId.toString() === student._id.toString()
      );


      if (enrollment) {
        return {
          ...student.toObject(),
          subscriptionDate: enrollment.subscriptionDate,
        };
      }

      return student;
    }) as Student[];
  }
}
