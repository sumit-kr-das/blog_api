import express from 'express';
import { registerController, loginController } from '../controller';

const router = express.Router();

router.post('/register', registerController).get('/login', loginController);

export default router;
