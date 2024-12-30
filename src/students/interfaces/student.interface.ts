import { Document } from "mongoose";

export interface Student extends Document {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  role: string;
  followedProfessors: string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}
