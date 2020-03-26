import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import probeRouter from './routes/sales/probe';
import assetsRouter from './routes/sales/assets';
import cancelLicenses from './routes/sales/cancel-licenses';
import delay from 'express-delay';
import useCancelLicensesRoutes from './routes/sales/cancel-licenses';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(delay(1, 2));
app.use(express.json());
app.use('/sales/api/probe', probeRouter);
app.use('/sales/api/assets', assetsRouter);

useCancelLicensesRoutes(app, '/sales/api/cancel-licenses');

export default app;
