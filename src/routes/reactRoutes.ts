import express,{Request, Response} from 'express';
import path from 'path';
const router = express.Router();

//---Sever Static Files
router.use(express.static(path.join(__dirname,'build')));
router.get('*',(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'build','index.html'));
});

export default router;