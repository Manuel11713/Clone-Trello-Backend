import pg,{ClientConfig} from 'pg';
import config from '../config';

const pgOptions:ClientConfig = {
    host: config.CONFIGPG.HOST,
    port: config.CONFIGPG.PORT,
    database: config.CONFIGPG.DATABASENAME,
    user: config.CONFIGPG.USER,
    password: config.CONFIGPG.PASSWORD,

}

const pgClient = new pg.Client(pgOptions);

export default pgClient;


