import { Injectable } from '@nestjs/common';
import { CreateBuyDto } from './dto/create-buy.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movies } from '@prisma/client';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class BuyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly moviesService: MoviesService,
  ) {}

  async create(data: CreateBuyDto) {
    return this.prismaService.beli.create({ data });
  }

  async listBought(id_user: number): Promise<Movies[]> {
    const listMovies: Movies[] = [];
  
    const boughtMovies = await this.prismaService.beli.findMany({
      where: { id_user: id_user },
    });
  
    const moviePromises = boughtMovies.map(async (boughtMovie) => {
      return this.moviesService.findOne(boughtMovie.id_film);
    });
  
    listMovies.push(...await Promise.all(moviePromises));
  
    return listMovies;
  }

  async remove(id_user: number, id_film: number) {
    return this.prismaService.beli.delete({
      where:{
        id_user_id_film:{
            id_user:id_user,
            id_film:id_film
          }
    }});
  }
}
