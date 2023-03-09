import express from 'express';
import { registerController, loginController, getRoles } from '../controller';
import { verifyToken } from '../middleware/verifyToken';
const router = express.Router();

router
.post('/register', registerController)
.post('/login', loginController)
.get('/getRoles', verifyToken, getRoles);

export default router;