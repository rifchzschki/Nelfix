import {
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsString,
  IsInt,
  IsOptional,
  IsPositive,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { isBuffer } from 'util';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  director: string;

  @IsInt()
  release_year: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'The genre array should not be empty.' })
  @ValidateNested({ each: true })
  @Type(() => String)
  genre: string[];

  @IsPositive()
  price: number;

  @IsInt()
  duration: number;

  @IsOptional()
  cover_image?: File | null;

  @IsOptional()
  video?: File | null;
}
