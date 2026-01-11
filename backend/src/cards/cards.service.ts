import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createCardDto: CreateCardDto) {
    return this.prisma.card.create({
      data: {
        ...createCardDto,
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.card.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });
    if (!card || card.userId !== userId) {
        return null; // Or throw NotFoundException
    }
    return card;
  }

  async update(id: number, userId: number, updateCardDto: UpdateCardDto) {
    // Ensure ownership first
    const card = await this.findOne(id, userId);
    if (!card) {
        throw new Error('Card not found or access denied');
    }

    return this.prisma.card.update({
      where: { id },
      data: updateCardDto,
    });
  }

  async remove(id: number, userId: number) {
    // Ensure ownership first
    const card = await this.findOne(id, userId);
    if (!card) {
        throw new Error('Card not found or access denied');
    }

    return this.prisma.card.delete({
      where: { id },
    });
  }
}
