import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MoviesService } from 'src/movies/movies.service';

@Module({
  imports: [PrismaModule],
  controllers: [WishlistController],
  providers: [WishlistService, MoviesService],
})
export class WishlistModule {}
