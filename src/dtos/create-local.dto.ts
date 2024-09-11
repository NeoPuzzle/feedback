import { IsNotEmpty, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateLocalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  managerId?: string;
}
