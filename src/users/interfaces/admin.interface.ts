import { Document } from "mongoose";

export interface Admin extends Document {
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
