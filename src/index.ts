import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import probeRouter from './responseProbe';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use('/api/probe', probeRouter);

export default app;