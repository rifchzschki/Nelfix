import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BuyModule } from './buy/buy.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { FeedbackModule } from './feedback/feedback.module';
import { MoviesService } from './movies/movies.service';
import { FeedbackService } from './feedback/feedback.service';
import { UsersService } from './users/users.service';
import { WishlistService } from './wishlist/wishlist.service';
import { BuyService } from './buy/buy.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    MoviesModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    BuyModule,
    WishlistModule,
    FeedbackModule,
    ConfigModule.forRoot({
      isGlobal: true, // Membuat ConfigModule tersedia di seluruh aplikasi tanpa perlu impor ulang
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MoviesService,
    FeedbackService,
    UsersService,
    WishlistService,
    BuyService,
    JwtService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
