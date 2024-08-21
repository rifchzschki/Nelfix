import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateBuyDto } from './dto/create-buy.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movies } from '@prisma/client';
import { MoviesService } from 'src/movies/movies.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BuyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly moviesService: MoviesService,
    private readonly userService: UsersService,
  ) {}

  async create(data: CreateBuyDto) {
    const user = await this.userService.getUserFromId(+data.id_user);
    const film = await this.moviesService.findOne(+data.id_film);
    if (user.balance >= film.price) {
      // Kurangi balance dan update user
      const updatedUser = await this.userService.updateUser(user.id, {
        balance: user.balance - film.price,
      });
      return this.prismaService.beli.create({ data });
    } else {
      throw new ForbiddenException('Uang tidak cukup untuk membeli film ini');
    }
  }

  async listBought(id_user: number): Promise<Movies[]> {
    const listMovies: Movies[] = [];

    const boughtMovies = await this.prismaService.beli.findMany({
      where: { id_user: id_user },
    });

    const moviePromises = boughtMovies.map(async (boughtMovie) => {
      return this.moviesService.findOne(boughtMovie.id_film);
    });

    listMovies.push(...(await Promise.all(moviePromises)));

    return listMovies;
  }

  async isBought(id_user: number, id_film: number) {
    console.log(id_user);
    console.log(id_film);
    const isFound = await this.prismaService.beli.findUnique({
      where: {
        id_user_id_film: {
          id_user: +id_user,
          id_film: +id_film,
        },
      },
    });
    return isFound !== null;
  }

  async remove(id_user: number, id_film: number) {
    return this.prismaService.beli.delete({
      where: {
        id_user_id_film: {
          id_user: id_user,
          id_film: id_film,
        },
      },
    });
  }
}
