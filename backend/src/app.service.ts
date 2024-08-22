import { Injectable, UnauthorizedException, Req } from '@nestjs/common';
import { Request } from 'express';
import { MoviesService } from './movies/movies.service';
import { FeedbackService } from './feedback/feedback.service';
import { UsersService } from './users/users.service';
import { WishlistService } from './wishlist/wishlist.service';
import { BuyService } from './buy/buy.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private readonly movieService: MoviesService,
    private readonly reviewService: FeedbackService,
    private readonly userService: UsersService,
    private readonly wishlistService: WishlistService,
    private readonly buyService: BuyService,
    private readonly jwtService: JwtService,
  ) {}

  async getMovies(page?: number, limit?: number, query?: string): Promise<any> {
    if (!page && !limit) {
      const moviesList = await this.movieService.findAll({});
      return {
        movies: moviesList,
        total: moviesList.length,
      };
    } else {
      if (!query) {
        const moviesList = await this.movieService.findAll({});
        return {
          movies: moviesList.slice(limit * (page - 1), limit * page),
          total: moviesList.length,
        };
      }
      const movies = await this.movieService.search(query);
      return {
        movies: movies.slice(limit * (page - 1), limit * page),
        total: movies.length,
      };
    }
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

  async getUserFromId(id: number) {
    return await this.userService.getUserFromId(id);
  }

  async getUserFromUsername(username: string) {
    return await this.userService.getUser(username);
  }

  async getWishlist(id: number) {
    return await this.wishlistService.showList(id);
  }

  async getBoughtList(id: number) {
    return await this.buyService.listBought(id);
  }

  async getBrowse(query?: string) {
    if (query) {
      return await this.movieService.findAll({});
    }
    return await this.movieService.search(query);
  }

  getInfo(@Req() req: Request, isRole: boolean) {
    // Mengambil token dari header Authorization atau cookie
    const token =
      req.cookies['authToken'] || req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token tidak ditemukan.');
    }

    // Decode token untuk mendapatkan payload
    const decoded = this.jwtService.decode(token) as {
      username: string;
      role: string;
    };

    if (!decoded) {
      throw new UnauthorizedException('Token tidak valid.');
    }

    // Mengembalikan informasi user
    if (isRole) {
      return {
        username: decoded.username,
        role: decoded.role,
      };
    } else {
      return {
        username: decoded.username,
        token: token,
      };
    }
  }

  async isBoughtInfo(id_user: number, id_film: number) {
    return await this.buyService.isBought(id_user, id_film);
  }
}
