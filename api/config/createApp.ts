import express from "express";
import { v1Router } from "../routes/mainRouter.js";

import swaggerUi from 'swagger-ui-express';
import YAML from "yamljs";
import { errorsMiddleware } from "../middlewares/errorMiddleware.js";


export async function CreateApp() {
    const swaggerDocument = YAML.load("./swagger.yaml");
    const app = express();
    app.use(express.json())
    app.use("/api/v1", v1Router)
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(errorsMiddleware)
    app.listen(8000, () => console.log("App is running on port 8000"));
}