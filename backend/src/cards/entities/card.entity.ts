import { ApiProperty } from '@nestjs/swagger';

export class Card {
  @ApiProperty()
  id: number;

  @ApiProperty()
  businessName: string;

  @ApiProperty()
  points: number;

  @ApiProperty()
  targetPoints: number;

  @ApiProperty()
  color: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
