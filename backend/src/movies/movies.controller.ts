import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Response, Request } from 'express';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ResponseDto } from './dto/response.dto';
import { Movies } from '@prisma/client';

@Controller('films')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    const movie = await this.moviesService.create(createMovieDto);
    return {
      id: movie.id.toString(),
      title: movie.title,
      description: movie.description,
      director: movie.director,
      release_year: movie.release_year,
      genre: movie.genre,
      price: movie.price,
      duration: movie.duration,
      video_url: movie.video_url,
      cover_image_url: movie.cover_image_url,
      created_at: movie.created_at,
      updated_at: movie.updated_at,
    };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Movies retrieved successfully',
    type: ResponseDto,
  })
  @ApiQuery({
    name: 'query',
    required: false,
    description: 'Title of the movie',
  }) // Tambahkan ApiQuery
  async searchMovies(@Query('query') query?: string) {
    let movies: Movies[] = [];
    if (!query) {
      movies = await this.moviesService.findAll({});
    }
    movies = await this.moviesService.search(query);
    const filteredMovies = movies.map(
      ({
        id,
        title,
        description,
        director,
        release_year,
        genre,
        price,
        duration,
        video_url,
        cover_image_url,
        created_at,
        updated_at,
      }) => ({
        id: id.toString(),
        title,
        description,
        director,
        release_year,
        genre,
        price,
        duration,
        cover_image_url,
        video_url,
        created_at,
        updated_at,
      }),
    );
    return filteredMovies;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const movie = await this.moviesService.findOne(+id);
    return {
      id: movie.id.toString(),
      title: movie.title,
      description: movie.description,
      director: movie.director,
      release_year: movie.release_year,
      genre: movie.genre,
      price: movie.price,
      duration: movie.duration,
      video_url: movie.video_url,
      cover_image_url: movie.cover_image_url,
      created_at: movie.created_at,
      updated_at: movie.updated_at,
    };
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    console.log('Updating movie with data:', updateMovieDto);
    const movie = await this.moviesService.update(+id, updateMovieDto);
    return {
      id: movie.id.toString(),
      title: movie.title,
      description: movie.description,
      director: movie.director,
      release_year: movie.release_year,
      genre: movie.genre,
      price: movie.price,
      duration: movie.duration,
      video_url: movie.video_url,
      cover_image_url: movie.cover_image_url,
      created_at: movie.created_at,
      updated_at: movie.updated_at,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const movie = await this.moviesService.remove(+id);
    return {
      id: movie.id.toString(),
      title: movie.title,
      description: movie.description,
      director: movie.director,
      release_year: movie.release_year,
      genre: movie.genre,
      price: movie.price,
      duration: movie.duration,
      video_url: movie.video_url,
      cover_image_url: movie.cover_image_url,
      created_at: movie.created_at,
      updated_at: movie.updated_at,
    };
  }
}
