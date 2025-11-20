import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  create(createCardDto: CreateCardDto) {
    return this.prisma.card.create({
      data: createCardDto,
    });
  }

  findAll() {
    return this.prisma.card.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.card.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return this.prisma.card.update({
      where: { id },
      data: updateCardDto,
    });
  }

  remove(id: number) {
    return this.prisma.card.delete({
      where: { id },
    });
  }
}
