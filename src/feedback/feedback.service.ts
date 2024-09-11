import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DestinationTypeService } from "src/destinationfeedback/destination-feedback.service";
import { CreateFeedbackDto } from "src/dtos/create-feedback.dto";
import { UpdateFeedbackDto } from "src/dtos/update-feedback.dto";
import { Feedback } from "src/entities/feedback.entity";
import { FeedbackTypeService } from "src/feedbacktype/feedback-type.service";
import { LocalService } from "src/local/local.service";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(Feedback) 
        private feedbackRepository: Repository<Feedback>,
        private usersService: UsersService,
        private localService: LocalService,
        private feedbackTypeService: FeedbackTypeService,
        private destinationTypeService: DestinationTypeService,
    ){}

    getAll(): Promise<Feedback[]> {
        return this.feedbackRepository.find({
            relations: ['user', 'local', 'type', 'destination'],
        });
    }

    async findOne(id: string): Promise<Feedback> {
        const feedback = await this.feedbackRepository.findOne({ 
            where: { id },
            relations: ['user', 'local', 'type', 'destination'],
        })
            if (!feedback) {
                throw new NotFoundException(`feedback not found ${id}`)
            }
            return feedback
    }

    async createFeedback(createFeedbackDto: CreateFeedbackDto): Promise <Feedback> {
        const user = createFeedbackDto.userId ? await this.usersService.findOne(createFeedbackDto.userId) : null;
        const local = createFeedbackDto.localId ? await this.localService.findOne(createFeedbackDto.localId) : null;
        const type = createFeedbackDto.typeId ? await this.feedbackTypeService.findOne(createFeedbackDto.typeId) : null;
        const destination = createFeedbackDto.destinationId ? await this.destinationTypeService.findOne(createFeedbackDto.destinationId) : null;

        const feedback = this.feedbackRepository.create({
            ...createFeedbackDto,
            user,
            local,
            type,
            destination,
        });
        return this.feedbackRepository.save(feedback);
    }

    async updateFeedback(id: string, updateFeedbackDto: UpdateFeedbackDto) : Promise<Feedback> {
        const feedback = await this.findOne(id);
        if (updateFeedbackDto.userId) {
            feedback.user = await this.usersService.findOne(updateFeedbackDto.userId);
        }
        if (updateFeedbackDto.localId) {
            feedback.local = await this.localService.findOne(updateFeedbackDto.localId);
        }
        if (updateFeedbackDto.typeId) {
            feedback.type = await this.feedbackTypeService.findOne(updateFeedbackDto.typeId);
        }
        if (updateFeedbackDto.destinationId) {
            feedback.destination = await this.destinationTypeService.findOne(updateFeedbackDto.destinationId);
        }
        Object.assign(feedback, updateFeedbackDto);
        return this.feedbackRepository.save(feedback);
    }

    async removeFeedback(id: string) : Promise <void> {
        const feedback = await this.findOne(id);
        await this.feedbackRepository.remove(feedback);
    }
}