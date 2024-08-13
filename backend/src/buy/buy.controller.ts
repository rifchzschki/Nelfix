import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BuyService } from './buy.service';
import { CreateBuyDto } from './dto/create-buy.dto';
import { ResponseDto } from './dto/response.dto';
import { Beli, Movies } from '@prisma/client';

@Controller('buy')
export class BuyController {
  constructor(private readonly buyService: BuyService) {}

  @Post()
  async createTransaction(
    @Body() createBuyDto: CreateBuyDto,
  ): Promise<ResponseDto<CreateBuyDto>> {
    try {
      return {
        status: 'success',
        message: 'transaction success',
        data: await this.buyService.create(createBuyDto),
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'transaction failed',
      };
    }
  }

  @Get(':id_user')
  async listBought(
    @Param('id_user') id_user: number,
  ): Promise<ResponseDto<Movies[]>> {
    try {
      return {
        status: 'success',
        message: 'success to get list of purchased films',
        data: await this.buyService.listBought(+id_user),
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(
    @Query('id_user') id_user: number,
    @Query('id_film') id_film: number,
  ): Promise<ResponseDto<Beli>> {
    try {
      return {
        status: 'success',
        message: `Purchase id_user: ${id_user}, id_film: ${id_film} has been deleted`,
        data: await this.buyService.remove(+id_user, +id_film),
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.code === 'P2025' ? 'Movies not found' : error.message,
      };
    }
  }
}
