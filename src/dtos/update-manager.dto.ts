import { IsOptional, IsString, IsEmail, IsDate } from 'class-validator';

export class UpdateManagerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsDate()
  hireDate?: Date;
}
