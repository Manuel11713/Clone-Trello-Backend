import {Request, Response} from 'express';
import Lists from '../models/Lists';


export const newList = async (req:Request, res:Response) =>{
    const {tableid, nameList} = req.body;
    
    if(!tableid || !nameList)return res.json({ok:false, message:'"tableid" and "nameList" must be provided'});
    
    //-----Create list instance and then save it.
    const list = new Lists(tableid,nameList);
    const _listid = await list.save();

    if(!_listid)return res.json({ok:false,message:"User can't be saved, try it later"});
    return res.json({ok:true,message:'list',_listid});
};


export const updateList = async (req:Request, res:Response) =>{
    const {listid, nameList} = req.body;

    if(!listid || !nameList)return res.json({ok:false, message:'listid and nameList must be provided'});

    const updated = await Lists.updateList(listid, nameList);

    if(!updated)return res.json({ok:false,message:"list can't be saved, try it later"});
    res.json({ok:true,message:'list saved'});
}