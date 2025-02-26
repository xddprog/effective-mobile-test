import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AppealStatuses } from "../../config/enums.js";

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
        enum: AppealStatuses, 
        default: AppealStatuses.NEW
    })
    status: AppealStatuses

    @Column({nullable: true})
    resolution: string

    @Column({nullable: true})
    cancelReason: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}