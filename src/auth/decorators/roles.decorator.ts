import { UserRole } from "src/auth/roles/roles.enum";
import { SetMetadata } from "@nestjs/common";

export const Roles = (...roles: UserRole[]) => SetMetadata("roles", roles);
