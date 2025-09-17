import express from 'express';
import swaggerUi from "swagger-ui-express";
import 'dotenv/config';

import { router } from './routes';
import { AppDataSource } from './data-source';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { requestLoggerMiddleware } from './middlewares/requestLoggerMiddleware';
import swaggerSpec from './swagger';

const app = express();

app.use(requestLoggerMiddleware);
app.use(express.json());
app.use('/api', router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

const run = async () => {
    await AppDataSource.initialize();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

run();
