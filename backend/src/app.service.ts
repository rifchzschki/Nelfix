import { Injectable } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { FeedbackService } from './feedback/feedback.service';
import { UsersService } from './users/users.service';
import { WishlistService } from './wishlist/wishlist.service';
import { BuyService } from './buy/buy.service';

@Injectable()
export class AppService {
  constructor(
    private readonly movieService: MoviesService,
    private readonly reviewService: FeedbackService,
    private readonly userService: UsersService,
    private readonly wishlistService: WishlistService,
    private readonly buyService: BuyService,
  ) {}

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

  async allMovies(): Promise<number> {
    return this.movieService.countMovies();
  }

  async getMovie(id: number) {
    return this.movieService.findOne(id);
  }

  async getReview(is_user: boolean, id_user: number, id_film: number) {
    return this.reviewService.findAllFeedback(is_user, id_user, id_film);
  }

  async getUserUsername(id: number) {
    return (await this.userService.findOne(id)).username;
  }

  async getWishlist(id: number) {
    return await this.wishlistService.showList(id);
  }

  async getBoughtList(id: number) {
    return await this.buyService.listBought(id);
  }

  async getBrowse(params:{director?: string, title?: string}) {
    const {director, title} = params;
    if(!title&&!director){
      return await this.movieService.findAll({})
    }
    return await this.movieService.search(params);
  }
}
