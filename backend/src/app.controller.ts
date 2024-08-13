import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('self') //nanti dibuat kalo frontend nya dah ada
  showToken(@Headers('authorization') authHeader: string): {
    token: string;
  } {
    const token = authHeader ? authHeader.split(' ')[1] : null;
    return { token };
  }
}
