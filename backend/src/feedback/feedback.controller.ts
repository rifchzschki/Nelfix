import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { ApiQuery } from '@nestjs/swagger';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ResponseDto } from './dto/response.dto';
import { Feedback } from '@prisma/client';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(@Body() createFeedbackDto: CreateFeedbackDto): Promise<ResponseDto<Feedback>> {
    try{
      return {
        status: "success",
        message: "successfull to create feedback",
        data: await this.feedbackService.create(createFeedbackDto)
      }
    }catch(error){
      return{
        status: "error",
        message: error.message
      }
    }
  }

  @Get('id')
  @ApiQuery({
    name: 'id_user',
    required: false,
    description: 'id user',
  }) // Tambahkan ApiQuery
  @ApiQuery({
    name: 'id_film',
    required: false,
    description: 'id film',
  }) // Tambahkan ApiQuery
  async findAllFeedbackUser(
    @Query('is_user') is_user: string,
    @Query('id_user') id_user?: string,
    @Query('id_film') id_film?: string,
  ): Promise<ResponseDto<Feedback[]>> {
    const isUser: boolean = is_user == 'true' ? true : false;
    try {
      return {
        status: 'success',
        message: 'successful to get feedback list',
        data: await this.feedbackService.findAllFeedback(
          isUser,
          +id_user,
          +id_film,
        ),
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Query('id_user') id_user: string,
    @Query('id_film') id_film: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<ResponseDto<Feedback>> {
    try {
      return {
        status: 'success',
        message: `Feedback with id_user: ${id_user} and id_film: ${id_film} has been updated`,
        data: await this.feedbackService.update(
          +id_user,
          +id_film,
          updateFeedbackDto,
        ),
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.code === 'P2025' ? 'Movies not found' : error.message,
      };
    }
  }

  @Delete(':id')
  async remove(
    @Query('id_user') id_user: string,
    @Query('id_film') id_film: string,
  ): Promise<ResponseDto<Feedback>> {
    try {
      return {
        status: 'success',
        message: `Feedback with id_user: ${id_user} and id_movies: ${id_film} has been deleted`,
        data: await this.feedbackService.remove(+id_user, +id_film),
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.code === 'P2025' ? 'Feedback not found' : error.message,
      };
    }
  }
}
