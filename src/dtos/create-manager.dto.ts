import { IsNotEmpty, IsEmail, IsString, IsOptional, IsDate } from 'class-validator';

export class CreateManagerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsDate()
  hireDate?: Date;
}
