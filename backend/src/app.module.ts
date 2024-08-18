import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BuyModule } from './buy/buy.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { FeedbackModule } from './feedback/feedback.module';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [
    MoviesModule,
    PrismaModule,
    AuthModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Gantilah dengan kunci rahasia yang lebih aman
      signOptions: { expiresIn: '60m' },
    }),
    ConfigModule.forRoot(), // Memuat variabel lingkungan dari file .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    BuyModule,
    WishlistModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MoviesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
