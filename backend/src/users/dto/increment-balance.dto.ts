import { IsInt } from 'class-validator';

export class IncrementDto {
  @IsInt()
  increment: number;
}
