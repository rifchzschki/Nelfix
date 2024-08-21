import { Module } from '@nestjs/common';
import { BuyService } from './buy.service';
import { BuyController } from './buy.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MoviesService } from 'src/movies/movies.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [BuyController],
  providers: [BuyService, MoviesService, UsersService],
})
export class BuyModule {}
