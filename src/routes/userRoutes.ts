import express from 'express';

//-----controllers
import {getUser,postUser} from '../controllers/userController'; 

//---init router
const router = express.Router();

//---routes user
router.post('/login',getUser);
router.post('/signup',postUser);


export default router;