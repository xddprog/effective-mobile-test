export interface CreateAppealDto {
    subject: string;
    message: string;
}


export interface UpdateAppealDto {
    message: string;
}


export interface AppealDto {
    id: number;
    subject: string;
    message: string;
    status: string;
    resolution?: string;
    cancelReason?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AppealQueryParams {
    date?: string;
    startDate?: string;
    endDate?: string;
}