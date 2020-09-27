import dotenv from 'dotenv';
dotenv.config();

const config = {
    CONFIGPG:{
        PASSWORD:process.env.PASSWORDPG,
        USER: process.env.USERPG || 'postgres',
        DATABASENAME: process.env.DATABASENAMEPG || 'tscpg',
        HOST: process.env.HOSTpg  || 'localhost',
        PORT: Number(process.env.PORTPG) || 5432
    },
    BCRYPT:{
        ROUNDS: Number(process.env.BCRYPTROUND) || 10
    },
    JWT:{
        SECRET: process.env.JWTSECRET || 'secret_shhhh' 
    }
}

export default config;