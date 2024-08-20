import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Nama depan tidak boleh kosong' })
  namaDepan: string;

  @IsString()
  @IsNotEmpty({ message: 'Nama belakang tidak boleh kosong' })
  namaBelakang: string;

  @IsString()
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  @Length(4, 20, { message: 'Username harus terdiri dari 4-20 karakter' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @Length(8, 32, { message: 'Password harus terdiri dari 8-32 karakter' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message:
      'Password harus mengandung minimal satu huruf besar, satu huruf kecil, dan satu angka',
  })
  password: string;

  @IsNumber()
  balance: number;

  @IsEmail({}, { message: 'Email harus dalam format yang benar' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @IsString()
  @IsOptional() // Role bersifat opsional, bisa diset default sebagai 'user' di service
  @Matches(/^(user|admin)$/, {
    message: 'Role harus "user" atau "admin"',
  })
  role: string;
}
