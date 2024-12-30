import { Document } from "mongoose";

export interface Professor extends Document {
  email: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  enrolledStudents: string[];
}
