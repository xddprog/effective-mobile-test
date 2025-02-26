import { AppealStatus } from "../config/enums.js";
import { Appeal } from "../database/models/appeal.js";
import { AppealDto, CreateAppealDto, UpdateAppealDto } from "../dto/appeal.js";
import { ApiError } from "../errors/apiErrors.js";
import { AppealRepository } from "../repositories/appealRepository.js";
import { IRepository } from "../repositories/base.js";
import { IService } from "./base.js";

export class AppealService implements IService {
    repository: AppealRepository;

    constructor() {
        this.repository = new AppealRepository();
    }

    private parseAndValidateDate(dateStr: string | undefined): Date {
        if (!dateStr) {
            throw ApiError.badRequest("Date is required and must be in YYYY-MM-DD format.");
        }

        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
            throw ApiError.badRequest("Invalid date format. Use YYYY-MM-DD.");
        }

        const [year, month, day] = dateStr.split("-");
        if (!year || !month || !day || year.length !== 4 || month.length !== 2 || day.length !== 2) {
            throw ApiError.badRequest("Invalid date format. Use YYYY-MM-DD.");
        }

        date.setHours(0, 0, 0, 0);
        return date;
    }

    public toDtoModel(appeal: Appeal): AppealDto {
        return {
            id: appeal.id,
            subject: appeal.subject,
            message: appeal.message,
            status: appeal.status,
            createdAt: appeal.createdAt,
            updatedAt: appeal.updatedAt
        };
    }
    
    public async createAppeal(form: CreateAppealDto): Promise<AppealDto> {
        const newAppeal = await this.repository.create(form);
        return this.toDtoModel(newAppeal);
    }

    public async getAppeals(
        date: string | undefined, 
        startDate: string | undefined, 
        endDate: string | undefined,
        limit: number,
        offset: number
    ): Promise<Array<AppealDto> | AppealDto> {
        if (!date && !startDate && !endDate) {
            const appeals = await this.repository.getAll(limit, offset);
            return appeals.map(appeal => this.toDtoModel(appeal));
        }
        
        if (date) {
            const parsedDate = this.parseAndValidateDate(date,);
            const endDate = new Date(parsedDate);
            endDate.setHours(23, 59, 59, 999);

            const appeals = await this.repository.getByDate(parsedDate, endDate, limit, offset);
            return appeals.map(appeal => this.toDtoModel(appeal));
        }

        const parsedStartDate = this.parseAndValidateDate(startDate);
        const parsedEndDate = this.parseAndValidateDate(endDate);

        const appeals = await this.repository.getByDateRange(
            parsedStartDate, parsedEndDate, limit, offset
        );
        return appeals.map(appeal => this.toDtoModel(appeal));
    }

    public async setTaskInProgress(appealId: number): Promise<AppealDto> {
        const appeal = await this.repository.update(appealId, {status: AppealStatus.IN_WORK});
        if (!appeal) {
            throw ApiError.notFound("Appeal not found.");
        }
        return this.toDtoModel(appeal);
    }
    
    public async setTaskCompleted(appealId: number, form: UpdateAppealDto) {
        const appeal = await this.repository.update(
            appealId, 
            {status: AppealStatus.COMPLETED, resolution: form.message}
        );
        if (!appeal) {
            throw ApiError.notFound("Appeal not found.");
        }
        return this.toDtoModel(appeal);
    }

    public async setTaskCanceled(appealId: number, form: UpdateAppealDto) {
        const appeal = await this.repository.update(
            appealId, 
            {status: AppealStatus.CANCELED, cancelReason: form.message}
        );
        if (!appeal) {
            throw ApiError.notFound("Appeal not found.");
        }
        return this.toDtoModel(appeal);
    }

    public async setTaskCanceledAllInProgress(): Promise<Array<AppealDto>> {
        const appeals = await this.repository.setTaskCanceledAllInProgress()
        return appeals.map(appeal => this.toDtoModel(appeal));
    }
}