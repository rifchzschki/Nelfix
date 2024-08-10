import { IsString, IsInt, IsOptional, IsPositive, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  director: string;

  @IsInt()
  releaseYear: number;

  @IsString()
  genre: string;

  @IsPositive()
  price: number;

  @IsInt()
  duration: number;

  @IsUrl()
  video: string;

  @IsUrl()
  @IsOptional()
  coverImage?: string;
}
