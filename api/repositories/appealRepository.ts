import { Between, In, Repository } from "typeorm";
import { Appeal } from "../database/models/appeal.js";
import { IRepository } from "./base.js";
import { db } from "../database/adapters/pg_adapter.js";
import { CreateAppealDto } from "../dto/appeal.js";
import { AppealStatus } from "../config/enums.js";



export class AppealRepository implements IRepository<Appeal> {
    model: Repository<Appeal>;

    constructor() {
        this.model = db.getRepository(Appeal);
    }

    async create(form: CreateAppealDto): Promise<Appeal> {
        const appeal = this.model.create({ subject: form.subject, message: form.message });
        return await this.model.save(appeal);
    }

    async getAll(limit: number, offset: number) {
        return await this.model.find({ 
            take: limit, 
            skip: offset, 
            order: { id: "ASC" }
        });
    }

    async getById(id: number): Promise<Appeal | null> {
        return await this.model.findOneBy({ id: id });
    }

    async getByDate(
        date: Date, 
        endDate: Date, 
        limit: number, 
        offset: number
    ): Promise<Array<Appeal>> {
        return await this.model.find({ 
            where: {
                createdAt: Between(date, endDate)
            },
            take: limit,
            skip: offset,
            order: { id: "ASC" }
        });
    }

    async getByDateRange(
        startDate: Date, 
        endDate: Date, 
        limit: number, 
        offset: number
    ): Promise<Array<Appeal>> {
        return await this.model.find({
            where: {
                createdAt: Between(startDate, endDate)
            },
            skip: offset,
            take: limit,
            order: { id: "ASC" }
        })
    }

    async update(id: number, updatedFields: Partial<Appeal>): Promise<Appeal | null> {
        const appeal = await this.model.findOneBy({ id: id });
        if (!appeal) {
            return null
        }
        return await this.model.save({ ...appeal, ...updatedFields });
    }

    async setTaskCanceledAllInProgress(): Promise<Array<Appeal>> {
        const appeals = await this.model.findBy({ status: AppealStatus.IN_WORK });
        const updatedIds = appeals.map(appeal => appeal.id);
        await this.model.update({ 
            id: In(updatedIds)}, 
            { status: AppealStatus.CANCELED }
        );
        return await this.model.find({ where: {id: In(updatedIds)} });
    }
}
