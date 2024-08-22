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
        // Ambil token dari header Authorization atau cookie
        const authHeader = req.headers.authorization;
        const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') 
          ? authHeader.split(' ')[1] 
          : null;
        
        const tokenFromCookie = req.cookies['authToken'];

        if (tokenFromHeader) {
          return tokenFromHeader;
        }

        if (tokenFromCookie) {
          return tokenFromCookie;
        }

        throw new UnauthorizedException('Token not found in headers or cookies');
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Gunakan kunci rahasia Anda
    });
  }

  async validate(payload: any) {
    return { username: payload.username, role: payload.role };
  }
}
