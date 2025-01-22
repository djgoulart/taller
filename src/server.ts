import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/tasks.routes';

const app = express();

app.use(bodyParser.json());

app.use('/tasks', router)

export default app;