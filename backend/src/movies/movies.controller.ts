import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ResponseDto } from './dto/response.dto';
import { Movies } from '@prisma/client';
import { response } from 'express';

@Controller('films')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<ResponseDto<Movies>> {
    try {
      return {
        status: 'success',
        message: 'Movie success created',
        data: await this.moviesService.create(createMovieDto),
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Movies retrieved successfully',
    type: ResponseDto,
  })
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Title of the movie',
  }) // Tambahkan ApiQuery
  @ApiQuery({
    name: 'director',
    required: false,
    description: 'Director of the movie',
  }) // Tambahkan ApiQuery
  async searchMovies(
    @Query('title') title?: string,
    @Query('director') director?: string,
  ): Promise<ResponseDto<Movies[]>> {
    if (!title && !director) {
      return {
        status: 'success',
        message: 'Movies retrieved successfully',
        data: await this.moviesService.findAll(),
      };
    }
    try{
      return this.moviesService.search({ title, director });
    }catch(error){
      return{
        status: "error",
        message: error.message
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Movies>>{
    try{
      return {
        status : "success",
        message: `Movie with id: ${id} is found`,
        data : await this.moviesService.findOne(+id)
      }
    } catch (error) {
        return {
          status : "error",
          message : error.message
        }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) : Promise<ResponseDto<Movies>>{
    try{
      return{
        status: "success",
        message: `Movie with id: ${id} successfull updated`,
        data: await this.moviesService.update(+id, updateMovieDto)
      }
    }catch(error){
      console.error('Error finding movie:', error);
      return{
        status: "error",
        message: error.code === 'P2025' ? "Movies not found" : error.message
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseDto<Movies>> {
    try{
      return {
        status: "success",
        message: `Movies with id: ${id} has been deleted`,
        data: await this.moviesService.remove(+id)
      }
    }catch(error){
      console.error('Error finding movie:', error);
      return{
        status: "error",
        message: error.code === 'P2025' ? "Movies not found" : error.message
      }
    }
  }
}
