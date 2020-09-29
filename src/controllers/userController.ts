import {Request, Response} from 'express';
import pgClient from '../database';
import User from '../models/User';

export const getTables = async (req:Request, res:Response) =>{
    const {_id} = req;
    const rows = await User.getTables(_id);
    if(!rows)return res.json({ok:false,message:"There are a problem try it later"});
    return res.json({ok:true,rows});
}

export const getLists = async (req:Request, res:Response)=>{
    const tablesid = Number(req.params.tablesid);
    if((typeof tablesid) != 'number')return res.json({ok:false,message:'tablesid must be a number'});

    const rows = await User.getLists(tablesid);
    if(!rows)return res.json({ok:false,message:"There are a problem try it later"});
    return res.json({ok:true,rows});
}

export const getCards = async (req: Request, res:Response) =>{
    const listsid = Number(req.params.listsid);
    if((typeof listsid) != 'number')return res.json({ok:false,message:'listsid must be a number'});

    const rows = await User.getCards(listsid);
    if(!rows)return res.json({ok:false,message:"There are a problem try it later"});
    return res.json({ok:true,rows});
}

export const getAllCards =async (req:Request, res:Response) =>{
    const {email} = req;
    const rows = await User.getAllData(email);

    if(!rows)return res.json({ok:false,message:'There was a problem'});
    
    res.json({ok:true,rows});
}

//Get user By email (/login)
export const getUser = async (req:Request, res: Response) =>{

    const {email,password}= req.body;

    if(!email || !password)return res.json({ok:false,message:'email and password must be provided'});
    
    //-----Search for user.
    const response = await User.findByEmail(email);
    if(!response)return res.json({ok:false,message:'something was wrong please try it leater'});
    if(response.length===0)return res.json({ok:false,message:'email or password wrong'});//wrong email
    
    //-----Compare Passwords
    const userSaved:{_id?:number, fullname:string,username:string,password?:string} = response[0];
    if(userSaved.password){
        const match = await User.comparePasswords(password,userSaved.password);
        if(!match)return res.json({ok:false,message:'email or password wrong'});//wrong password
    }
    
    //-----Create Token and send response to client.
    delete userSaved.password;
    const token = await User.tokenizing(userSaved);
    delete userSaved._id; //id only in token
    res.json({ok:true,message:'user saved',token,userSaved});
}

//Create a new user (/newUser)
export const postUser =async (req:Request,res:Response)=>{
    const {fullname, username, email, password} = req.body;
    
    //-----All of this data must be provided.
    if(!fullname || !username || !email || !password) return res.json({ok:false,message:'fullname, username, email and password must be provided'});
    
    //-----Verify if email is already in db.
    const response = await User.findByEmail(email);
    if(!response)return res.json({ok:false,message:'something was wrong please try it leater'});
    if(response.length===1)return res.json({ok:false,message:'user is already in db'});
    
    //-----Create new intance of user model and then save it.
    const user = new User(fullname,username,email,password);
    const userSaved:({_id?:number, fullname:string,username:string}  | null) = await user.save();
    if(!userSaved)return res.json({ok:false,message:'something was wrong please try it leater'});

    //-----Create token and send response to client.
    const token = await User.tokenizing(userSaved);
    delete userSaved._id;//id only in token;
    res.json({ok:true,message:'user saved',token,userSaved});
};

