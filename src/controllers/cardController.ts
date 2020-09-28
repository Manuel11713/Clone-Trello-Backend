import {Request, Response} from 'express';

import Card from '../models/Card';

export const newCard = async (req:Request, res:Response) =>{
    const {listid, nameCard} = req.body;

    if(!listid || !nameCard)return res.json({ok:false,message:'"listid" and "nameCard" must be provided'});

    //-----Create new instance and then saved.
    const card = new Card(listid, nameCard);
    const _cardid = await card.save();

    if(!_cardid)return res.json({ok:false, message:"Card can't be saved, try it later"});
    res.json({ok:true, message:'card saved',_cardid});
};

export const updateCard = async (req:Request, res:Response) =>{
    const {cardid, nameCard} = req.body;
    if(!cardid || !nameCard)return res.json({ok:false,message:'cardid and nameCard must be provided'});

    const updated =  await Card.updateCard(cardid, nameCard);
    if(!updated) return res.json({ok:false,message:"card can't be saved "});

    return res.json({ok:true, message:'card saved'});
}