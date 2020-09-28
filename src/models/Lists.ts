import pgClient from '../database';


export default class Lists{
    tableid:number;
    namelist:string;

    constructor(tableid:number,namelist:string){
        this.tableid = tableid;
        this.namelist = namelist;
    }

    async save():Promise<number | null>{
        try{
            const res = await pgClient.query(`INSERT INTO lists(namelist, _tablesid) VALUES('${this.namelist}',${this.tableid}) RETURNING _listid`);
            return res.rows[0]._listid;
        }catch(err){
            return null;
        }
    }

    static async updateList(listid:number, nameList:string):Promise<boolean>{
        try{
            await pgClient.query(`UPDATE lists SET namelist='${nameList} WHERE _listid=${listid}'`);
            return true
        }catch(err){
            console.log(err);
            return false;
        }
    }
}