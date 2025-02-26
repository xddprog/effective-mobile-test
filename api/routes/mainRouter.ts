import { Router } from "express";
import { appealsRouter } from "./v1/appealRoutes.js";
export const v1Router = Router()


v1Router.use("/appeals", appealsRouter)