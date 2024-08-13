import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { ResponseDto } from './dto/response.dto';
import { Movies, Wishlist } from '@prisma/client';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlist: WishlistService) {}

  @Post()
  async createWishlist(
    @Body() data: CreateWishlistDto,
  ): Promise<ResponseDto<CreateWishlistDto>> {
    try {
      return {
        status: 'success',
        message: 'transaction success',
        data: await this.wishlist.create(data),
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'transaction failed',
      };
    }
  }

  @Get(':id_user')
  async show(
    @Param('id_user') id_user: number,
  ): Promise<ResponseDto<Movies[]>> {
    try {
      return {
        status: 'success',
        message: 'success to get list of purchased films',
        data: await this.wishlist.showList(+id_user),
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
  ): Promise<ResponseDto<Wishlist>> {
    try {
      return {
        status: 'success',
        message: `Purchase id_user: ${id_user}, id_film: ${id_film} has been deleted`,
        data: await this.wishlist.remove(+id_user, +id_film),
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.code === 'P2025' ? 'Movies not found' : error.message,
      };
    }
  }
}
