import { BaseEntity, Repository } from "typeorm";

export interface IRepository<T extends BaseEntity> {
    model: Repository<T>;
}
