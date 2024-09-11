import { IsOptional, IsString } from 'class-validator';

export class UpdateFeedbackTypeDto {
  @IsOptional()
  @IsString()
  description?: string;
}
