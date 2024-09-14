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
import cloudinary from "src/config/cloudinary";

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

    async uploadImage(files: Express.Multer.File): Promise<string> {
        if (!files || !files.buffer || files.buffer.length === 0) {
            throw new Error('File is empty');
        }
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'auto' },(error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result.secure_url);
            }).end(files.buffer);
        });
    }

    async createFeedback(createFeedbackDto: CreateFeedbackDto, image1: Express.Multer.File, image2: Express.Multer.File): Promise <Feedback> {
        const user = createFeedbackDto.user_id ? await this.usersService.findOne(createFeedbackDto.user_id) : null;
        const local = createFeedbackDto.localId ? await this.localService.findOne(createFeedbackDto.localId) : null;
        const type = createFeedbackDto.typeId ? await this.feedbackTypeService.findOne(createFeedbackDto.typeId) : null;
        const destination = createFeedbackDto.destinationId ? await this.destinationTypeService.findOne(createFeedbackDto.destinationId) : null;
        
        let image1Url: string | undefined;
        let image2Url: string | undefined;
        
        if (image1) {
            image1Url = await this.uploadImage(image1);
        }
        if (image2) {
            image2Url = await this.uploadImage(image2);
        }

        const feedback = this.feedbackRepository.create({
            subject: createFeedbackDto.subject,
            description: createFeedbackDto.description,
            date: createFeedbackDto.date ? new Date(createFeedbackDto.date) : undefined,
            image1Url,
            image2Url,
            user,
            local,
            type,
            destination,
        });
        
        return this.feedbackRepository.save(feedback);
    }

    async updateFeedback(id: string, updateFeedbackDto: UpdateFeedbackDto, files: any) : Promise<Feedback> {
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

        if (files.image1) {
            feedback.image1Url = await this.uploadImage(files.image1);
        }
        if (files.image2) {
            feedback.image2Url = await this.uploadImage(files.image2);
        }
        Object.assign(feedback, updateFeedbackDto);
        return this.feedbackRepository.save(feedback);
    }

    async removeFeedback(id: string) : Promise <void> {
        const feedback = await this.findOne(id);
        await this.feedbackRepository.remove(feedback);
    }
}