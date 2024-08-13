import { IsInt} from 'class-validator';

export class CreateWishlistDto {
    @IsInt()
    id_user: number;
    
    @IsInt()
    id_film: number;
}
