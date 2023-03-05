import express from 'express';
import { getUsers } from '../controller';
import { verifyAdmin } from '../middleware/verifyToken';

const router = express.Router();

router.get('/', verifyAdmin, getUsers);

export default router;
