import { Injectable } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { FeedbackService } from './feedback/feedback.service';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private readonly movieService: MoviesService, private readonly reviewService: FeedbackService, private readonly userService: UsersService) {}

  async getMovies(
    page: number = 1,
    limit: number = 10,
    title?: string,
    director?: string,
  ): Promise<any> {
    if (!title && !director) {
      return await this.movieService.findAll({ page, limit });
    }
    return await this.movieService.search({ title, director });
  }

  async allMovies(): Promise<number>{
    return this.movieService.countMovies();
  }

  async getMovie(id: number){
    return this.movieService.findOne(id);
  }

  async getReview(is_user:boolean,id_user: number, id_film: number){
    return this.reviewService.findAllFeedback(is_user, id_user, id_film);
  }

  async getUserUsername(id:number){
    return (await this.userService.findOne(id)).username;
  }
}
