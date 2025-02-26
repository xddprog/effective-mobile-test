import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/apiErrors.js";
import { ErrorRequestHandler } from "express";

export const errorsMiddleware: ErrorRequestHandler = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack || (err.message ? err.message : "Неизвестная ошибка"));

  if (err instanceof ApiError) {
    res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status
      }
    });
  } else {
    res.status(500).json({
      error: {
        message: "Непредвиденная ошибка! Сервис StreetForce не работает!",
        status: 500
      }
    });
  }
};