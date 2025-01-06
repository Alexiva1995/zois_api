import { Document, Types } from "mongoose";

export interface Professor extends Document {
  email: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  enrolledStudents: Array<{
    studentId: Types.ObjectId;
    subscriptionDate: Date;
  }>;
}
