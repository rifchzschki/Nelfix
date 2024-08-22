import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Movies, Users } from '@prisma/client';
import { IncrementDto } from './dto/increment-balance.dto';
import { filter } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query('q') q?: string) {
    let users: Users[] = await this.usersService.findAll(q);
    const filteredUsers = users.map(({ id, email, username, balance }) => ({
      id: id.toString(),
      username,
      email,
      balance,
    }));
    return filteredUsers;
  }

  @Get(':id')
  async getInfoId(@Param('id') id: string) {
    const user = await this.usersService.getUserFromId(+id);
    return {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
      balance: user.balance,
    };
  }

  @Post(':id/balance')
  async incrementBalance(
    @Param('id') id: string,
    @Body() increment: IncrementDto,
  ) {
    return await this.usersService.incrementBalance(+id, increment.increment);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedUser = await this.usersService.remove(+id);

    return {
      id: deletedUser.id.toString(),
      username: deletedUser.username,
      email: deletedUser.email,
      balance: deletedUser.balance,
    };
  }
}
