import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import probeRouter from './routes/probe';
import assetsRouter from './routes/assets';
import delay from 'express-delay';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(delay(1, 2));
app.use(express.json());
app.use('/sales/api/probe', probeRouter);
app.use('/sales/api/assets', assetsRouter);

export default app;
