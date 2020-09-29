import pgClient from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';


class User{
    fullname:string;
    username:string;
    email:string;
    password:string;

    constructor(fullname:string, username:string, email:string, password:string){
        this.fullname = fullname;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    async save(): Promise< {_id:number, fullname:string,username:string}  | null>{
        try{
            const salt = await bcrypt.genSalt(config.BCRYPT.ROUNDS);
            const hashed = await bcrypt.hash(this.password,salt);
            const res = await pgClient.query(`INSERT INTO person(fullname, username, email, password) \
                                            VALUES('${this.fullname}','${this.username}', '${this.email}', '${hashed}') RETURNING _id`);
            const userSaved = {
                _id: res.rows[0]._id,
                fullname:this.fullname,
                username:this.username,
                email:this.email
            }
            return userSaved;
        }catch (e){
            return null;
        }
    }
    static async findByEmail(email:string): Promise<Array<{_id:number,fullname:string,username:string,password:string,email:string}> | null>{
        try{
            let res = await pgClient.query(`SELECT * FROM person WHERE email='${email}'`);
            const userSaved = res.rows;
            return userSaved;
        }catch (err){
            console.log(err);
            return null;
        }
    }
    static async comparePasswords(password:string,hashed:string){
        return await bcrypt.compare(password,hashed);
    }
    static tokenizing(data:string | object){
        const token = jwt.sign(data,config.JWT.SECRET,{expiresIn:'3d'});
        return token;
    }
    static async getTables(_id:number):Promise<object[] | null>{
        try{
            const res = await pgClient.query(`SELECT * FROM tables WHERE _personid=${_id}`);
            return res.rows;
        }catch(err){
            console.log(err);
            return null;
        }
    }
    static async getLists(tablesid:number):Promise<object[] | null>{
        try{
            const res = await pgClient.query(`SELECT * FROM lists WHERE _tablesid='${tablesid}'`);
            return res.rows;
        }catch(err){
            console.log(err);
            return null;
        }
    }
    static async getCards(listsid:number):Promise<object[] | null>{
        try{
            const res = await pgClient.query(`SELECT * FROM cards WHERE _listid='${listsid}'`);
            return res.rows;
        }catch(err){
            console.log(err);
            return null;
        }
    }
    static async getAllData(email:string):Promise<Array<object> | null>{
        try{
            const res = await pgClient.query(`
                SELECT _id, email, tables._tablesid, nametable, background, lists._listid, namelist, cards._cardid, namecard 
                FROM person 
                INNER JOIN tables ON person._id=tables._personid 
                INNER JOIN lists ON tables._tablesid=lists._tablesid 
                INNER JOIN cards ON lists._listid=cards._listid
                WHERE email='${email}'
                ORDER BY tables._tablesid`);
            return res.rows;
        }catch(err){
            console.log(err);
            return null;
        }
    }
}



export default User;