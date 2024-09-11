import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  description: string;

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
