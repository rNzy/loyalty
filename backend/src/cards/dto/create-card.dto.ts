import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty()
  businessName: string;

  @ApiProperty()
  targetPoints: number;

  @ApiProperty({ required: false, default: 0 })
  points?: number;

  @ApiProperty({ required: false, default: '#000000' })
  color?: string;
}
