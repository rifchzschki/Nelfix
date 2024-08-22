import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(query?: string) {
    if (query == null) {
      query = '';
    }
    const users = await this.prismaService.users.findMany({
      where: {
        username: {
          contains: query,
          mode: 'insensitive', // Pencarian tidak case-sensitive
        },
      },
    });
    return users;
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

  async incrementBalance(id: number, inc: number) {
    const user = await this.prismaService.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.prismaService.users.update({
      where: { id },
      data: { balance: user.balance + inc },
    });
    return {
      id: updatedUser.id.toString(),
      username: updatedUser.username,
      email: updatedUser.email,
      balance: updatedUser.balance,
    };
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

  async remove(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    return this.prismaService.users.delete({
      where: { id },
    });
  }
}
