import { AuthService } from "../auth/auth.service";
import { Body, Controller, Post, HttpStatus, HttpException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post("login")
  @ApiOperation({ summary: "Log in a user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.OK, description: "Login successful, token returned." })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Invalid email or password." })
  async login(@Body() loginUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.findOneByEmail(loginUserDto.email);

      if (!user) {
        throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
      }
      const isPasswordValid = await user.comparePassword(loginUserDto.password);

      if (!isPasswordValid) {
        throw new HttpException("Invalid password", HttpStatus.UNAUTHORIZED);
      }
      const token = await this.authService.createToken(user);
      delete user.password;
      delete user.passwordResetExpires;
      delete user.passwordResetToken;
      return { user, token };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }

  //   @Post("reset-password")
  //   @ApiOperation({ summary: "Reset a user's password" })
  //   @ApiResponse({ status: HttpStatus.OK, description: "Password reset successfully." })
  //   @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Invalid or expired token." })
  //   async resetPassword(@Body() body: { token: string; newPassword: string }) {
  //     try {
  //       await this.usersService.resetPassword(body.token, body.newPassword);
  //       return {
  //         message: "Password reset successfully."
  //       };
  //     } catch (error) {
  //       throw new HttpException("Invalid or expired token.", HttpStatus.UNAUTHORIZED);
  //     }
  //   }
}
