import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Feedback } from "./feedback.entity";

@Entity({
    name: 'destinationtype'
})
export class DestinationType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @OneToMany(() => Feedback, (feedbacks) => feedbacks.destination)
    @JoinColumn({name: 'feedback_id'})
    feedbacks: Feedback;
}