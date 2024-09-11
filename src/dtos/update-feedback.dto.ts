import { IsOptional, IsString, IsDate } from 'class-validator';

export class UpdateFeedbackDto {
  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  localId?: string;

  @IsOptional()
  @IsString()
  typeId?: string;

  @IsOptional()
  @IsString()
  destinationId?: string;
}
