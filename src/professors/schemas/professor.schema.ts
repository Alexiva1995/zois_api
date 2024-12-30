import { Schema } from "mongoose";
import { UserRole } from "src/auth/roles/roles.enum";

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
  professorId: { type: String, required: true, unique: true },
  enrolledStudents: [{ type: Schema.Types.ObjectId, ref: "Student", default: [] }]
});

ProfessorSchema.pre("save", function (next) {
  if (!this.professorId) {
    this.professorId = `PROF-${Date.now()}`;
  }
  next();
});
