import {
  Controller,
  Get,
  Req,
  Query,
  BadRequestException,
  Res,
  UseInterceptors,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';
import { Response, Request } from 'express';
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

  @UseGuards(JwtAuthGuard)
  @Get('browse')
  async browse(
    @Res() res: Response,
    @Req() req: Request,
    @Query('query') query?: string,
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '18',
  ) {
    const user = await this.appService.getUserFromUsername(
      this.appService.getInfo(req, true).username,
    );
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new BadRequestException('Invalid page number');
    }
    if (isNaN(pageSizeNumber) || pageSizeNumber < 1) {
      throw new BadRequestException('Invalid page size');
    }
    const moviesResponse = await this.appService.getMovies(
      pageNumber,
      pageSizeNumber,
      query,
    );
    const { movies, total } = moviesResponse;
    console.log(total);
    return res.render('browse', {
      layout: 'layout_main',
      data: movies,
      total: total,
      page: pageNumber,
      pageSize: pageSizeNumber,
      route: 'browse',
      user: user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  async dashboard(
    @Res() res: Response,
    @Req() req: Request,
    @Query('page') page = '1',
    @Query('pageSize') pageSize = '12',
  ) {
    const user = await this.appService.getUserFromUsername(
      this.appService.getInfo(req, true).username,
    );
    console.log(user);
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new BadRequestException('Invalid page number');
    }
    if (isNaN(pageSizeNumber) || pageSizeNumber < 1) {
      throw new BadRequestException('Invalid page size');
    }
    const { movies: moviesPagi, total: totalPagi } =
      await this.appService.getMovies(pageNumber, pageSizeNumber);
    const { movies, total } = await this.appService.getMovies();
    const { movies: firstMovies, total: totalTmp } =
      await this.appService.getMovies((pageNumber - 1) * pageSizeNumber + 1, 1);
    return res.render('dashboard', {
      layout: 'layout_main',
      firstData: firstMovies,
      dataPagi: moviesPagi,
      data: movies,
      total: total,
      page: pageNumber,
      pageSize: pageSizeNumber,
      route: 'dashboard',
      user: user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail')
  async detail(
    @Res() res: Response,
    @Req() req: Request,
    @Query('id_user') id_user,
    @Query('id_film') id_film,
  ) {
    const isBought = await this.appService.isBoughtInfo(id_user, id_film);
    const user = await this.appService.getUserFromUsername(
      this.appService.getInfo(req, true).username,
    );
    const movie = await this.appService.getMovie(+id_film);
    const review = await this.appService.getReview(false, +id_user, +id_film);
    let users = [];
    let sum = 0;
    for (const element of review) {
      sum += element.rating;
      users.push(
        (await this.appService.getUserFromId(element.id_user)).username,
      );
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
      user: user,
      isBought: isBought,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get('bought')
  async bought(
    @Res() res: Response,
    @Req() req: Request,
    @Query('id_user') id_user: number,
  ) {
    const user = await this.appService.getUserFromUsername(
      this.appService.getInfo(req, true).username,
    );
    const movies = await this.appService.getBoughtList(+id_user);
    return res.render('bought_list', {
      layout: 'layout_main',
      movies: movies,
      user: user,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get('wishlist')
  async wishlist(
    @Res() res: Response,
    @Req() req: Request,
    @Query('id_user') id_user: string,
  ) {
    const user = await this.appService.getUserFromUsername(
      this.appService.getInfo(req, true).username,
    );
    const movies = await this.appService.getWishlist(+id_user);
    return res.render('wishlist', {
      layout: 'layout_main',
      movies: movies,
      user: user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('self')
  showToken(@Req() req: Request) {
    return this.appService.getInfo(req, false);
  }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  getUserInfo(@Req() req: Request) {
    return this.appService.getInfo(req, true);
  }
}
