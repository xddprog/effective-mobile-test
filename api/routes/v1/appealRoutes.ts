import { NextFunction, Request, Response, Router } from "express";
import { AppealService } from "../../services/appealService.js";
import { AppealDto, AppealQueryParams, CreateAppealDto, UpdateAppealDto } from "../../dto/appeal.js";


export const appealsRouter = Router()


appealsRouter.post(
    "/", 
    async (req: Request<{}, {}, CreateAppealDto>, res: Response<AppealDto>) => {
        const appealService = new AppealService()
        const form = req.body
        const newAppeal = await appealService.createAppeal(form)
        res.status(201).json(newAppeal)
    }
)

appealsRouter.get(
    "/",
    async (
        req: Request<{}, {}, {}, AppealQueryParams>, 
        res: Response<Array<AppealDto> | AppealDto>, 
        next: NextFunction
    ) => {
        try{
            const appealService = new AppealService()
            const appeals = await appealService.getAppeals(
                req.query.date, 
                req.query.startDate, 
                req.query.endDate,
                req.query.limit || 10,
                req.query.offset || 0
            )
            res.status(200).json(appeals)
        } catch (err) {
            next(err)
        }
    }
)

appealsRouter.put(
    "/:id/start",
    async (
        req: Request<{id: number}, {}, AppealDto>, 
        res: Response<AppealDto>, 
        next: NextFunction
    ) => {
        try{
            const appealService = new AppealService()
            const appeal = await appealService.setTaskInProgress(req.params.id)
            res.status(200).json(appeal)
        } catch (err){
            next(err)
        }
    }
)

appealsRouter.put(
    "/:id/complete",
    async (
        req: Request<{id: number}, {}, UpdateAppealDto>, 
        res: Response<AppealDto>, 
        next: NextFunction
    ) => {
        try{
            const appealService = new AppealService()
            const appeal = await appealService.setTaskCompleted(req.params.id, req.body)
            res.status(200).json(appeal)
        } catch (err) {
            next(err)
        }
    }
)

appealsRouter.put(
    "/:id/cancel",
    async (
        req: Request<{id: number}, {}, UpdateAppealDto>, 
        res: Response<AppealDto>, 
        next: NextFunction
    ) => {
        try{
            const appealService = new AppealService()
            const appeal = await appealService.setTaskCanceled(req.params.id, req.body)
            res.status(200).json(appeal)
        } catch (err) {
            next(err)
        }
    }
)

appealsRouter.put(
    "/cancel-all-in-progress",
    async (
        req: Request<{}, {}, {}>, 
        res: Response<Array<AppealDto>>, 
        next: NextFunction
    ) => {
        try{
            const appealService = new AppealService()
            const appeals = await appealService.setTaskCanceledAllInProgress()
            res.status(200).json(appeals)
        } catch (err) {
            next(err)
        }
    }
)