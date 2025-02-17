
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import authRouter from './app/modules/auth/auth.routes';
import productRouter from './app/modules/product/product.routes';
import orderRoutes from './app/modules/order/order.routes';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:5173','http://localhost:5001','http://localhost:5175'], credentials: true }));

// application routes
app.use('/api/auth',authRouter);
app.use('/api/product',productRouter);
app.use('/api/order',orderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running !');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
