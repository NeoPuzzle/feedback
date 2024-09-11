import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { Feedback } from "src/entities/feedback.entity";
import { CreateFeedbackDto } from "src/dtos/create-feedback.dto";
import { UpdateFeedbackDto } from "src/dtos/update-feedback.dto";

@Controller('feedbacks')
export class FeedbackController {
    constructor(
        private readonly feedbackService: FeedbackService
    ) {}

    @Get()
    getAll() {
        return this.feedbackService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.feedbackService.findOne(id);
    }

    @Post()
    createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
        return this.feedbackService.createFeedback(createFeedbackDto);
    }

    @Put(':id')
    updateFeedback(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
        return this.feedbackService.updateFeedback(id, updateFeedbackDto);
    }

    @Delete(':id')
    removeFeedback(@Param('id') id: string) {
        return this.feedbackService.removeFeedback(id);
    }
}