import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signup(data: CreateUserDto) {
    if (
      isNotEmpty(
        await this.prisma.users.findFirst({
          where: { username: data.username },
        }),
      ) ||
      isNotEmpty(
        await this.prisma.users.findFirst({ where: { email: data.email } }),
      )
    ) {
      throw new Error('Username or Email has been used');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = await this.prisma.users.create({
      data,
    });
    return this.generateJwt(user);
  }

  async login(data: LoginUserDto) {
    const user = await this.prisma.users.findFirst({
      where: { username: data.username },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException(
        'Login failed, please check your username and password again',
      );
    }
    return this.generateJwt(user);
  }

  private generateJwt(user: any) {
    const payload = { username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
