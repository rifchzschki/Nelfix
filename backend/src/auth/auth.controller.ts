import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { ResponseDto } from './dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createAccount: CreateUserDto): Promise<ResponseDto> {
    try {
      return {
        status: 'success',
        message: 'Sign up successfuly',
        data: {
          username: createAccount.username,
          token: (await this.authService.signup(createAccount)).access_token,
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Post('login')
  async login(@Body() loginData: LoginUserDto): Promise<ResponseDto> {
    try {
      return {
        status: 'success',
        message: 'Login successfuly',
        data: {
          username: loginData.username,
          token: (await this.authService.login(loginData)).access_token,
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
