import { IsInt, IsNumber, IsString, Min, Max} from 'class-validator';

export class CreateFeedbackDto {
    @IsInt()
    id_user: number;
    
    @IsInt()
    id_film: number;

    @IsNumber()
    @Min(0, { message: 'Rating must not be less than 0.' })
    @Max(5, { message: 'Rating must not be greater than 5.' })
    rating: number;

    @IsString()
    comment: string;

}
