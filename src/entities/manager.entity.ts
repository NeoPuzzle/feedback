import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Local } from "./local.entity";

@Entity({
    name: 'manager'
})
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true})
    phone?: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'date', nullable: true})
    hireDate?: Date;

    @OneToMany(() => Local, (local) => local.manager)
    local: Local[];
}