import { Schema } from "mongoose";
import { UserRole } from "src/auth/roles/roles.enum";
import * as bcrypt from 'bcrypt';

export const ProfessorSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.PROFESSOR
  },
  createdAt: { type: Date, default: Date.now },
  signalsCount: { type: Number, default: 0 },
  professorId: { type: String, required: false, unique: true },
  enrolledStudents: [{ type: Schema.Types.ObjectId, ref: "Student", default: [] }],
  name: { type: String, required: true },
  surname: { type: String, required: true }
});

ProfessorSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  console.log('Candidate Password:', candidatePassword);
  console.log('Stored Password1:', this.password);
  return bcrypt.compare(candidatePassword, this.password);
};
ProfessorSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  if (!this.professorId) {
    this.professorId = `PROF-${Date.now()}`;
  }
  console.log('Hashing password...');
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});
