import {
  Controller,
  Get,
  Headers,
  Query,
  BadRequestException,
  Res,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

@Controller()
@UseInterceptors(TransformResponseInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res: Response) {
    return res.render('login', {
      layout: 'layout_login',
      message: '',
    });
  }

  @Get('browse')
  async browse(
    @Res() res: Response,
    @Query('director') director?: string,
    @Query('title') title?: string,
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '18',
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new BadRequestException('Invalid page number');
    }
    if (isNaN(pageSizeNumber) || pageSizeNumber < 1) {
      throw new BadRequestException('Invalid page size');
    }
    const totalMovies = await this.appService.allMovies();
    const movies = await this.appService.getMovies(
      pageNumber,
      pageSizeNumber,
      director,
      title,
    );
    console.log(movies);
    return res.render('browse', {
      layout: 'layout_main',
      data: movies,
      total: totalMovies,
      page: pageNumber,
      pageSize: pageSizeNumber,
      route: 'browse',
    });
  }

  @Get('dashboard')
  async dashboard(
    @Res() res: Response,
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '12',
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new BadRequestException('Invalid page number');
    }
    if (isNaN(pageSizeNumber) || pageSizeNumber < 1) {
      throw new BadRequestException('Invalid page size');
    }
    const totalMovies = await this.appService.allMovies();
    const firstMovies = await this.appService.getMovies(1, 1);
    const movies = await this.appService.getMovies(pageNumber, pageSizeNumber);
    return res.render('dashboard', {
      layout: 'layout_main',
      firstData: firstMovies,
      data: movies,
      total: totalMovies,
      page: pageNumber,
      pageSize: pageSizeNumber,
      route: 'dashboard',
    });
  }

  @Get('detail')
  async detail(
    @Res() res: Response,
    @Query('id_user') id_user,
    @Query('id_film') id_film,
  ) {
    const movie = await this.appService.getMovie(+id_film);
    const review = await this.appService.getReview(false, +id_user, +id_film);
    let users = [];
    let sum = 0;
    for (const element of review) {
      sum += element.rating;
      users.push(await this.appService.getUserUsername(element.id_user));
    }
    const combinedReviews = review.map((review, index) => ({
      username: users[index],
      ...review,
    }));

    const averageRating = sum / review.length;
    return res.render('detail_movies', {
      layout: 'layout_main',
      data: movie,
      rating: averageRating,
      review: combinedReviews,
      users: users,
    });
  }
  @Get('bought')
  async bought(@Res() res: Response, @Query('id_user') id_user: number) {
    const movies = await this.appService.getBoughtList(+id_user);
    return res.render('bought_list', {
      layout: 'layout_main',
      movies: movies,
    });
  }
  @Get('wishlist')
  async wishlist(@Res() res: Response, @Query('id_user') id_user: string) {
    const movies = await this.appService.getWishlist(+id_user);
    return res.render('wishlist', {
      layout: 'layout_main',
      movies: movies,
    });
  }

  @Get('self') //nanti dibuat kalo frontend nya dah ada
  showToken(@Request() req) {
    const username = req.user;
    const token = req.headers.authorization.split(' ')[1];
    return { username, token };
  }
}
