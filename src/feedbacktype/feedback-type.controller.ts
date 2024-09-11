import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FeedbackTypeService } from './feedback-type.service';
import { CreateFeedbackDto } from 'src/dtos/create-feedback.dto';
import { UpdateFeedbackTypeDto } from 'src/dtos/update-feedback-type.dto';

@Controller('feedback-type')
export class FeedbackTypeController {
    constructor(private readonly feedbackTypeService: FeedbackTypeService) {}

    @Get()
    findAll() {
        return this.feedbackTypeService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.feedbackTypeService.findOne(id);
    }

    @Post()
    createType(@Body() createFeedbackDto: CreateFeedbackDto) {
        return this.feedbackTypeService.createType(createFeedbackDto);
    }

    @Put(':id')
    updateType(@Param('id') id: string, @Body() updateFeedbackTypeDto:UpdateFeedbackTypeDto) {
        return this.feedbackTypeService.updateType(id, updateFeedbackTypeDto);
    }

    @Delete(':id')
    removeType(@Param('id') id: string) {
        return this.feedbackTypeService.removeType(id);
    }
}
