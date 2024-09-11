import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackTypeDto {
  @IsNotEmpty()
  @IsString()
  description: string;
}
