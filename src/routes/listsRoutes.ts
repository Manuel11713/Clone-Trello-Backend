import express from 'express';
const router = express.Router();

//-----Middlewares
import verifyToken from '../middlewares/verify-token';

//-----Controllers
import {newList, updateList} from '../controllers/listsController';

router.post('/newList', verifyToken, newList);
router.put('/updatelsit',verifyToken, updateList);

export default router;