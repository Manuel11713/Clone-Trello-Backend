import express from 'express';

//-----Middleares
import verifyToken from '../middlewares/verify-token';

//-----controllers
import {getUser,getAllCards,getTables,postUser} from '../controllers/userController'; 

//---init router
const router = express.Router();

//---routes user
router.get('/get-all-cards',verifyToken,getAllCards);
router.get('/get-tables-user',verifyToken,getTables);

router.post('/login',getUser);
router.post('/signup',postUser);


export default router;