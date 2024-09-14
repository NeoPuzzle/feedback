import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { Feedback } from "src/entities/feedback.entity";
import { CreateFeedbackDto } from "src/dtos/create-feedback.dto";
import { UpdateFeedbackDto } from "src/dtos/update-feedback.dto";
import { FilesInterceptor } from "@nestjs/platform-express";

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
    @UseInterceptors(FilesInterceptor('files'))
    createFeedback(@Body() createFeedbackDto: CreateFeedbackDto, @UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(createFeedbackDto);
        
        return this.feedbackService.createFeedback(createFeedbackDto, files[0], files[1]);
    }

    @Put(':id')
    @UseInterceptors(FilesInterceptor('files'))
    updateFeedback(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto, @UploadedFiles() files: Express.Multer.File[]) {
        return this.feedbackService.updateFeedback(id, updateFeedbackDto, files);
    }

    @Delete(':id')
    removeFeedback(@Param('id') id: string) {
        return this.feedbackService.removeFeedback(id);
    }
}