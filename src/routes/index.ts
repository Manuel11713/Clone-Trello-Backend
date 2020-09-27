import express, { Router } from 'express';
const router = express.Router();

import userRouter from './userRoutes';
import tablesRouter from './tablesRoutes';
import listRouter from './listsRoutes';

router.use(userRouter);
router.use(tablesRouter);
router.use(listRouter);

export default router