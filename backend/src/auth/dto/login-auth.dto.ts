import { IsString, IsEmail, IsNotEmpty, Length, Matches, IsOptional, IsNumber } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  @Length(4, 20, { message: 'Username harus terdiri dari 4-20 karakter' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @Length(8, 32, { message: 'Password harus terdiri dari 8-32 karakter' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message: 'Password harus mengandung minimal satu huruf besar, satu huruf kecil, dan satu angka',
  })
  password: string;
}
