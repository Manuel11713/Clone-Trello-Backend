import pgClient from '../database';

export default class Card{
    listid:number;
    cardName:string;

    constructor(listid:number,cardName:string){
        this.listid = listid;
        this.cardName = cardName;
    }
    async save():Promise<number | null>{
        try{
            const res = await pgClient.query(`INSERT INTO cards(namecard, _listid) VALUES('${this.cardName}',${this.listid}) RETURNING _cardid`);
            return res.rows[0]._cardid;
        }catch(err){
            console.log(err);
            return null;
        }
    }
    static async updateCard(cardid:string, newName:string):Promise<boolean>{
        try{
            await pgClient.query(`UPDATE cards SET namecard='${newName}' WHERE _cardid=${cardid}`);
            return true;
        }catch(e){
            return false;
        }
    }
}