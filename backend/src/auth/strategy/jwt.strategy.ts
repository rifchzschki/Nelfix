import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        // Ambil token dari cookie
        const token = req.cookies['authToken'];
        if (!token) {
          throw new UnauthorizedException('Token not found in cookies');
        }
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Gunakan kunci rahasia Anda
    });
  
  }

  async validate(payload: any) {
    return { username: payload.username, role: payload.role };
  }
}
