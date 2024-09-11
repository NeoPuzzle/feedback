import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Feedback } from "../entities/feedback.entity";
import { FeedbackService } from "./feedback.service";
import { FeedbackController } from "./feedback.controller";
import { UsersService } from "../users/users.service";
import { LocalService } from "../local/local.service";
import { DestinationTypeService } from "../destinationfeedback/destination-feedback.service";
import { FeedbackTypeService } from "../feedbacktype/feedback-type.service";
import { Users } from "src/entities/user.entity";
import { Local } from "src/entities/local.entity";
import { ManagerService } from "src/manager/manager.service";
import { Manager } from "src/entities/manager.entity";
import { FeedbackType } from "src/entities/feedback-type.entity";
import { DestinationType } from "src/entities/destination-type.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Feedback, Users, Local, Manager, FeedbackType, DestinationType]),
    ],
    providers: [
        FeedbackService,
        ManagerService,
        UsersService, 
        LocalService, 
        FeedbackTypeService, 
        DestinationTypeService
    ],
    controllers:[FeedbackController],
})

export class FeedbackModule {}