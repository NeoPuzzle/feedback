import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Local } from "./local.entity";
import { FeedbackType } from "./feedback-type.entity";
import { DestinationType } from "./destination-type.entity";
import { Users } from "./user.entity";

@Entity(
    {name: 'feedback'}
)
export class Feedback {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    subject: string;

    @Column('text')
    description: string;

    @Column({ type: 'timestamp', nullable: true })
    date?: Date;

    @Column({ nullable: true })
    image1Url?: string;

    @Column({ nullable: true })
    image2Url?: string;

    @ManyToOne(() => Users, (user) => user.feedbacks, { nullable: true})
    @JoinColumn({name: 'user_id'})
    user:Users;

    @ManyToOne(() => Local, (local) => local.feedbacks, { nullable: true})
    @JoinColumn({name: 'local_id'})
    local:Local;

    @ManyToOne(() => FeedbackType, (type) => type.feedbacks, { nullable: true})
    @JoinColumn({name: 'type_id'})
    type:FeedbackType;

    @ManyToOne(() => DestinationType, (destination) => destination.feedbacks, { nullable: true})
    @JoinColumn({name: 'destination_id'})
    destination:DestinationType;

    
}