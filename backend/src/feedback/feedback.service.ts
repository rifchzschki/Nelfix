import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Feedback, Movies } from '@prisma/client';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFeedbackDto) {
    return this.prisma.feedback.create({ data });
  }

  async findAllFeedback(isUser: boolean, id_user?: number, id_film?: number): Promise<Feedback[]> {
    if (isUser) {
      return this.prisma.feedback.findMany({
        where: { id_user:  id_user },
      });
    } else {
      return this.prisma.feedback.findMany({
        where: { id_film: id_film },
      });
    }
  }

  async update(id_user: number, id_film: number, data: UpdateFeedbackDto) {
    if (isNaN(id_user) || id_user <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    if (isNaN(id_film) || id_film <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    return this.prisma.feedback.update({
      where: {
        id_user_id_film: { id_user: id_user, id_film: id_film },
      },
      data,
    });
  }

  async remove(id_user: number, id_film: number) {
    if (isNaN(id_user) || id_user <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    if (isNaN(id_film) || id_film <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    return this.prisma.feedback.delete({
      where: { id_user_id_film: { id_user: id_user, id_film: id_film } },
    });
  }
}
