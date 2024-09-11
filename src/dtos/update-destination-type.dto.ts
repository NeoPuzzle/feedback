import { IsOptional, IsString } from 'class-validator';

export class UpdateDestinationTypeDto {
    @IsOptional()
    @IsString()
    description?: string;
}
