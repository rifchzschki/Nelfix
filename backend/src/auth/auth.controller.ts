import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { ResponseDto } from './dto/response.dto';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/signup')
  async signup(@Body() createAccount: CreateUserDto) {
    return {
      username: createAccount.username,
      token: (await this.authService.signup(createAccount)).access_token,
    };
  }

  @Post('login')
  async login(@Body() loginData: LoginUserDto) {
    return {
      username: loginData.username,
      token: (await this.authService.login(loginData)).access_token,
    };
  }

  @Post('auth/cookies')
  async setCookies(@Body() loginData: LoginUserDto, @Res() res: Response) {
    const token = (await this.authService.login(loginData)).access_token;
    // Set cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      sameSite: 'strict', // Sesuaikan dengan pengaturan Anda
      maxAge: 24 * 60 * 60 * 1000, // Masa berlaku cookie (misalnya 1 hari)
    });
    res.status(200).json({ message: 'Login successful' });
  }

  @Get('auth/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('authToken', {
      httpOnly: true,
      sameSite: 'strict',
    }); // Hapus cookie dengan nama 'authToken'
    res.status(200).json({ message: 'Logout successful' });
  }
}
