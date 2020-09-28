import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import {IToken} from '../interfaces';

const verifyToken = (req:Request, res:Response, next:NextFunction)=>{
    const token = req.headers.token;

    if(!token)return res.json('token must be provided');
    try{
        const decoded:(IToken | string) = <IToken | string>jwt.verify(String(token), config.JWT.SECRET);  
        if(typeof decoded === 'object' && decoded._id){
            req._id = decoded._id;
            req.email = decoded.email;
            next();
        }
    }catch (err){
        console.log(err);
    }
}

export default verifyToken;
