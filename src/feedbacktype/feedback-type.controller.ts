import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FeedbackTypeService } from './feedback-type.service';
import { UpdateFeedbackTypeDto } from 'src/dtos/update-feedback-type.dto';
import { CreateFeedbackTypeDto } from 'src/dtos/create-feedback-type.dto';

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
    createType(@Body() createFeedbackTypeDto: CreateFeedbackTypeDto) {
        return this.feedbackTypeService.createType(createFeedbackTypeDto);
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
