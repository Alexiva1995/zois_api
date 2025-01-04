import { Student } from "./../students/interfaces/student.interface";
import { Admin } from "./interfaces/admin.interface";
import { Professor } from "./../professors/interfaces/professor.interface";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class UsersService {
  constructor(
    @InjectModel("Student") private readonly studentModel: Model<Student>,
    @InjectModel("Professor") private readonly professorModel: Model<Professor>,
    @InjectModel("Admin") private readonly adminModel: Model<Admin>
  ) {}

  async findOneByEmail(email: string): Promise< Student | Professor | Admin  | null> {
    const student = await this.studentModel.findOne({ email }).exec();
    if (student) {
      return student;
    }

    const professor = await this.professorModel.findOne({ email }).exec();
    if (professor) {
      return professor;
    }

    const admin = await this.adminModel.findOne({ email }).exec();
    if (admin) {
      return admin;
    }

    // Si no se encuentra en ninguno, devolver null
    return null;
  }
}
