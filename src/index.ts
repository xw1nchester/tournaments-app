import express from 'express';
import 'dotenv/config';

import { router } from './routes';
import { AppDataSource } from './data-source';
import { errorMiddleware } from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());
app.use('/api', router);
app.use(errorMiddleware)

const PORT = process.env.PORT || 8080;

const run = async () => {
    await AppDataSource.initialize()

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

run();