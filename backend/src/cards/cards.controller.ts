import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@ApiTags('cards')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOkResponse({ type: Card })
  create(@Request() req, @Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(req.user.userId, createCardDto);
  }

  @Get()
  @ApiOkResponse({ type: [Card] })
  findAll(@Request() req) {
    return this.cardsService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOkResponse({ type: Card })
  findOne(@Request() req, @Param('id') id: string) {
    return this.cardsService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, req.user.userId, updateCardDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.cardsService.remove(+id, req.user.userId);
  }
}
