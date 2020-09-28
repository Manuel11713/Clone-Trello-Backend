import {Request, Response} from 'express'; 
import Tables from '../models/Tables';


export const newTable = async (req:Request, res:Response)=>{

    const {nameTable, background} = req.body;
    if(!nameTable)return res.json({ok:false,message:'nameTable must be provided'});
    const {_id} = req; //from middleware verify-token.

    //-----create new intance of table and save it.
    const table = new Tables(_id, nameTable, background);
    const _tablesid = await table.createTable();

    if(!_tablesid)return res.json({ok:false,message:'something was wrong, please try it leater'});
    
    res.json({ok:true,message:'table created',_tablesid});
}

export const updateTable = async (req:Request, res:Response) =>{
    const{_tableid,nametable, background}:{_tableid:number,nametable:string,background:string} = req.body;
    
    if(!_tableid || !nametable || !background) return res.json({ok:false,message:"_tableid, nametable and background must be provided"});

    const updated = await Tables.updateTable(_tableid,nametable, background);

    if(!updated)return res.json({ok:false,message:'error saving table, please try it later'});
    return res.json({ok:true,message:'table updated'});
}