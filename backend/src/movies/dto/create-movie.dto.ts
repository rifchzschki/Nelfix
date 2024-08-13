import { IsArray, ArrayNotEmpty, ValidateNested, IsString, IsInt, IsOptional, IsPositive, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  director: string;

  @IsInt()
  releaseYear: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'The genre array should not be empty.' })
  @ValidateNested({ each: true })
  @Type(() => String)
  genre: string[];

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
