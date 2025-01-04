import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as jwt from "jsonwebtoken";
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  async createToken(user: any) {
    const payload = { email: user.email, sub: user._id };
    const options = { expiresIn: process.env.JWT_EXPIRES_IN, secret: process.env.JWT_SECRET };
    return this.jwtService.sign(payload, options);
  }
}
