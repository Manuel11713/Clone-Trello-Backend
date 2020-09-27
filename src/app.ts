import express from 'express';
import routes from './routes';

const app = express();


//---Milddlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//-------routes
app.use(routes);


export default app;
