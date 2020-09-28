import express from 'express';
const router = express.Router();

//-----Middlewares
import verifyToken from '../middlewares/verify-token';

//-----Controllers
import {newCard} from '../controllers/cardController';

router.post('/newCard', verifyToken, newCard);
router.put('/updateCard',verifyToken, newCard);

export default router;