import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Feedback } from "./feedback.entity";

@Entity({
    name:'feedbacktype'
})
export class FeedbackType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @OneToMany(() => Feedback, (feedbacks) => feedbacks.type)
    @JoinColumn({name: 'feedback_id'})
    feedbacks: Feedback;
}