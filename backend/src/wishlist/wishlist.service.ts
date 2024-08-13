import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movies } from '@prisma/client';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class WishlistService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly moviesService: MoviesService,
  ) {}

  async create(data: CreateWishlistDto) {
    return this.prismaService.wishlist.create({ data });
  }

  async showList(id_user: number): Promise<Movies[]> {
    const listMovies: Movies[] = [];

    const wishlist = await this.prismaService.wishlist.findMany({
      where: { id_user: id_user },
    });

    const moviePromises = wishlist.map(async (boughtMovie) => {
      return this.moviesService.findOne(boughtMovie.id_film);
    });

    listMovies.push(...(await Promise.all(moviePromises)));

    return listMovies;
  }

  async remove(id_user: number, id_film: number) {
    return this.prismaService.wishlist.delete({
      where: {
        id_user_id_film: {
          id_user: id_user,
          id_film: id_film,
        },
      },
    });
  }
}
