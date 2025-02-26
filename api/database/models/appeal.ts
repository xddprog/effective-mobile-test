import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AppealStatus } from "../../config/enums.js";

@Entity()
export class Appeal extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    subject: string

    @Column()
    message: string

    @Column({
        type: "enum", 
        enum: AppealStatus, 
        default: AppealStatus.NEW
    })
    status: AppealStatus

    @Column({nullable: true})
    resolution: string

    @Column({nullable: true})
    cancelReason: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}