import mongoose from 'mongoose';
import { UserRole } from 'src/auth/roles/roles.enum';

export const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passwordResetToken: String,
    passwordResetExpires: Date,
    role: {
        type: String,
        enum: Object.values(UserRole.ADMIN),
        default: UserRole.ADMIN,
    },
});