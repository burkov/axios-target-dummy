import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import probeRouter from './routes/probe';
import operationsRouter from './routes/assets/operations';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use('/sales/api/probe', probeRouter);
app.use('/sales/api/assets/operations', operationsRouter);

export default app;
