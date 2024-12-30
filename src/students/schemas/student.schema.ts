import { Schema } from "mongoose";
import { UserRole } from "src/auth/roles/roles.enum";

export const StudentSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.STUDENT
  },
  followedProfessors: [{ type: Schema.Types.ObjectId, ref: "Professor", default: [] }]
});
