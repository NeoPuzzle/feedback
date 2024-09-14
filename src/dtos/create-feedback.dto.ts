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
  image1Url?: string;

  @IsOptional()
  @IsString()
  image2Url?: string;

  @IsOptional()
  @IsString()
  user_id?: string;

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
