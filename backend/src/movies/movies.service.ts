import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ResponseDto } from './dto/response.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Movies } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMovieDto) {
    return this.prisma.movies.create({
      data,
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

  async search(params: {
    title?: string;
    director?: string;
  }): Promise<ResponseDto<Movies[]>> {
    const { title, director } = params;
    const movies = await this.prisma.movies.findMany({
      where: {
        OR: [
          {
            title: {
              contains: title,
              mode: 'insensitive',
            },
            director: {
              contains: director,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    return {
      status: 'success',
      message:
        movies.length > 0
          ? 'Movies retrieved successfully'
          : 'Movies not found',
      data: movies,
    };
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

  async update(id: number, data: UpdateMovieDto) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    return this.prisma.movies.update({
      where: { id },
      data,
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
