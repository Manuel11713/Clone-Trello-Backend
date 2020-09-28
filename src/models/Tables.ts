import pgClient from '../database';

export default class Tables{
    _personid:number;
    nameTable:string;
    background:string;

    constructor(_id:number, nameTable:string, background:string='#3d5afe'){
        this._personid = _id;
        this.nameTable = nameTable;
        this.background = background;
    }

    async createTable():Promise<number | null>{
        try{
            const res = await pgClient.query(`INSERT INTO tables(nametable, background, _personid) VALUES('${this.nameTable}','${this.background}',${this._personid}) RETURNING _tablesid`);
            return res.rows[0]._tablesid;
        }catch(err){
            console.log(err);
            return null;
        }
    }
    static async updateTable(idTable:number, newName:string, newBackground:string):Promise<boolean>{
        try{
            await pgClient.query(`UPDATE tables SET nametable='${newName}' background='${newBackground}' WHERE _tableid=${idTable}`);
            return true;
        }catch(err){
            return false;
        }
    }
}