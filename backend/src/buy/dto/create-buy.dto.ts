import { IsInt} from 'class-validator';

export class CreateBuyDto {
    @IsInt()
    id_user: number;
    
    @IsInt()
    id_film: number;
}
