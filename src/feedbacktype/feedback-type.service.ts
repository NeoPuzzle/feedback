import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFeedbackTypeDto } from 'src/dtos/create-feedback-type.dto';
import { UpdateFeedbackTypeDto } from 'src/dtos/update-feedback-type.dto';
import { FeedbackType } from 'src/entities/feedback-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackTypeService {
    constructor(
    @InjectRepository(FeedbackType) 
    private feedbackTypeRepository: Repository<FeedbackType>,
    ) {}

    getAll(): Promise<FeedbackType[]> {
        return this.feedbackTypeRepository.find();
    }

    async findOne(id: string): Promise<FeedbackType> {
        const type =  await this.feedbackTypeRepository.findOneBy({id});
            if (!type) {
                throw new NotFoundException(`Type not found ${id}`)
            }
            return type;
    }

    createType(createFeedbackTypeDto: CreateFeedbackTypeDto): Promise<FeedbackType> {
        const feedbackType = this.feedbackTypeRepository.create(createFeedbackTypeDto);
        return this.feedbackTypeRepository.save(feedbackType);
    }

    async updateType(id: string, updateFeedbackTypeDto: UpdateFeedbackTypeDto): Promise<FeedbackType> {
        const feedbackType = await this.findOne(id);
        const updateFeedbackType = Object.assign(feedbackType, updateFeedbackTypeDto)
        return this.feedbackTypeRepository.save(updateFeedbackType);
    }

    async removeType(id: string): Promise<void> {
        const feedbackType = await this.findOne(id);
        await this.feedbackTypeRepository.remove(feedbackType);
    }
}
