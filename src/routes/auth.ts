import express from 'express';
import { registerController, loginController } from '../controller';

const router = express.Router();

router.post('/register', registerController).post('/login', loginController);

export default router;
