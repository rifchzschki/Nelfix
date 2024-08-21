import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }
  
  async getUserFromId(id: number) {
    return await this.prismaService.users.findUniqueOrThrow({
      where: { id },
    });
  }
  async getUser(username: string) {
    return await this.prismaService.users.findFirstOrThrow({
      where: { username },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    // Cek apakah user dengan ID tersebut ada
    const user = await this.prismaService.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user dengan data yang diberikan di DTO
    const updatedUser = await this.prismaService.users.update({
      where: { id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
