
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import authRouter from './app/modules/auth/auth.routes';
import projectRouter from './app/modules/project/project.routes';
import skillRouter from './app/modules/skill/skill.routes';


const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:3000','http://localhost:5000'], credentials: true }));

// application routes
app.use('/api/auth',authRouter);
app.use('/api/project',projectRouter);
app.use('/api/skill',skillRouter);


app.get('/', (req: Request, res: Response) => {
  res.send('Server is running !');
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
