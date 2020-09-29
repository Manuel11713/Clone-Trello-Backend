import express from 'express';

//-----Middleares
import verifyToken from '../middlewares/verify-token';

//-----controllers
import {getUser,getCards,getTables,getLists,postUser} from '../controllers/userController'; 

//----init router
const router = express.Router();

//----routes user
router.get('/get-tables-user',verifyToken,getTables);
router.get('/get-lists-user/:tablesid',verifyToken,getLists);
router.get('/get-cards-user/:listsid',verifyToken,getCards);

router.post('/login',getUser);
router.post('/signup',postUser);


export default router;