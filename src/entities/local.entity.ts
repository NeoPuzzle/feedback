import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Manager } from "./manager.entity";
import { Feedback } from "./feedback.entity";

@Entity({
    name: 'local'
})
export class Local {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length: 50, nullable: false})
    name: string;

    @Column({type: 'text', nullable: true})
    address: string;

    @Column({default: 'Activo'})
    status: string;

    @Column({ type: 'date', nullable: true })
    createdAt?: Date;

    @ManyToOne(() => Manager, (manager) => manager.local)
    @JoinColumn({name:'manager_id'})
    manager: Manager;

    @OneToMany(() => Feedback, (feedbacks) => feedbacks.local)
    feedbacks: Feedback[];
}