import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import probeRouter from './probe';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use('/sales/api/probe', probeRouter);

export default app;
