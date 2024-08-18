import { Injectable } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Injectable()
export class AppService {
  constructor(private readonly movieService: MoviesService) {}

  async getMovies(
    title: string,
    director: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<any> {
    if (!title && !director) {
      return await this.movieService.findAll({ page, limit });
    }
    return await this.movieService.search({ title, director });
  }
}
