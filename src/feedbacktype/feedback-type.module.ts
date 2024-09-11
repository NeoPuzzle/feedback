import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackTypeService } from './feedback-type.service';
import { FeedbackTypeController } from './feedback-type.controller';
import { FeedbackType } from '../entities/feedback-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackType])],
  providers: [FeedbackTypeService],
  controllers: [FeedbackTypeController],
})
export class FeedbackTypeModule {}
