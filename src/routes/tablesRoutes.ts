import express, { Router } from 'express';
const router = express.Router();

//-----Middlewares
import verifyToken from '../middlewares/verify-token';

//-----Controllers
import {newTable, updateTable} from '../controllers/tablesController'

router.post('/newtable', verifyToken, newTable);
router.put('/updataTable',verifyToken, updateTable);

export default router;