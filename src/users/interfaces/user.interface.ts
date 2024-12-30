import { UserRole } from './../../auth/roles/roles.enum';
import { Document } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  role: UserRole;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
