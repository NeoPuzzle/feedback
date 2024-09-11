import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinationType } from '../entities/destination-type.entity';
import { DestinationTypeService } from './destination-feedback.service';
import { DestinationTypeController } from './destination-feedback.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DestinationType])],
  providers: [DestinationTypeService],
  controllers: [DestinationTypeController],
})
export class DestinationTypeModule {}
