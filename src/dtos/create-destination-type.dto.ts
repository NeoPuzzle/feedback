import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDestinationTypeDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
