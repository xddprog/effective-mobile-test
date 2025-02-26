import { IRepository } from "../repositories/base.js";

export interface IService {
    repository: IRepository<any>
}