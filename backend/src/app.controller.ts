import {
  Controller,
  Get,
  Headers,
  Render,
  Res,
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
      message: 'Hello world!!',
    });
  }

  @Get('browse')
  browse(@Res() res: Response) {
    return res.render('browse', {
      layout: 'layout_main',
      message: 'Hello world!!',
    });
  }

  @Get('dashboard')
  dashboard(@Res() res: Response) {
    return res.render('dashboard', {
      layout: 'layout_main',
      message: 'Hello world!!',
    });
  }

  @Get('detail')
  detail(@Res() res: Response) {
    return res.render('detail_movies', {
      layout: 'layout_main',
      message: 'Hello world!!',
    });
  }
  @Get('bought')
  bought(@Res() res: Response) {
    return res.render('bought_list', {
      layout: 'layout_main',
      message: 'Hello world!!',
    });
  }
  @Get('wishlist')
  wishlist(@Res() res: Response) {
    return res.render('wishlist', {
      layout: 'layout_main',
      message: 'Hello world!!',
    });
  }

  @Get('self') //nanti dibuat kalo frontend nya dah ada
  showToken(@Headers('authorization') authHeader: string): {
    token: string;
  } {
    const token = authHeader ? authHeader.split(' ')[1] : null;
    return { token };
  }
}
