import express, { Request, Response } from 'express';
import config from 'config';

import postRoutes from './routes/post';
import authRoutes from './routes/auth';
import userRouter from './routes/user';

const app = express();
const PORT = config.get<number>('port');

/* MIDDLEWARE */
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json('Listening on port 8000');
});

/* ROUTES */
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
    console.log(`Listening on port no ${PORT}`);
});
