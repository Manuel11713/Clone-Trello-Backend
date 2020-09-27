import express from 'express';
const router = express.Router();

//-----Middlewares
import verifyToken from '../middlewares/verify-token';

//-----Controllers
import {newList} from '../controllers/listsController';

router.post('/newList', verifyToken, newList);

export default router;