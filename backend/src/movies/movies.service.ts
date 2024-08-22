import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Movies } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(movieData: CreateMovieDto) {
    //algo for url...
    const video_url = '';
    const cover_url = '';

    return this.prisma.movies.create({
      data: {
        title: movieData.title,
        description: movieData.description,
        director: movieData.director,
        release_year: movieData.release_year,
        genre: movieData.genre,
        price: movieData.price,
        duration: movieData.duration,
        video_url: video_url,
        cover_image_url: cover_url,
      },
    });
  }

  async findAll(params: { page?: number; limit?: number }): Promise<Movies[]> {
    const { page, limit } = params;
    if (!page && !limit) {
      return this.prisma.movies.findMany();
    }
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.movies.findMany({
        skip,
        take: limit,
      }),
      this.prisma.movies.count(),
    ]);

    return data;
  }

  async countMovies(): Promise<number> {
    return this.prisma.movies.count();
  }

  async search(query: string) {
    if (query == null) {
      query = '';
    }
    const movies = await this.prisma.movies.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive', // Pencarian tidak case-sensitive
            },
          },
          {
            director: {
              contains: query,
              mode: 'insensitive', // Pencarian tidak case-sensitive
            },
          },
        ],
      },
    });

    return movies;
  }

  public async findOne(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid ID');
    }

    try {
      return await this.prisma.movies.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      console.error('Error finding movie:', error);

      if (error.code === 'P2025') {
        // Prisma error code for "Record not found"
        throw new NotFoundException('Movie not found');
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async update(id: number, movieData: UpdateMovieDto) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid ID');
    }

    // Ambil data movie hanya sekali
    const existingMovie = await this.findOne(id);

    // Jika movie tidak ditemukan, lemparkan exception
    if (!existingMovie) {
      throw new NotFoundException('Movie not found');
    }
    console.log('Updating movie with data:', movieData);

    return await this.prisma.movies.update({
      where: { id },
      data: {
        title: movieData.title ?? existingMovie.title,
        description: movieData.description ?? existingMovie.description,
        director: movieData.director ?? existingMovie.director,
        release_year: movieData.release_year ?? existingMovie.release_year,
        genre: movieData.genre ?? existingMovie.genre,
        price: movieData.price ?? existingMovie.price,
        duration: movieData.duration ?? existingMovie.duration,
        video_url: existingMovie.video_url,
        cover_image_url: existingMovie.cover_image_url,
      },
    });
  }

  async remove(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    return this.prisma.movies.delete({
      where: { id },
    });
  }
}
