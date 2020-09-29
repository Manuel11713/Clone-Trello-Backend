import express, { Router } from 'express';
const router = express.Router();

import userRouter from './userRoutes';
import tablesRouter from './tablesRoutes';
import listRouter from './listsRoutes';
import cardRouter from './cardsRoutes';
import reactRouter from './reactRoutes';


router.use(userRouter);
router.use(tablesRouter);
router.use(listRouter);
router.use(cardRouter);

//This must be the last router.
router.use(reactRouter);

export default router