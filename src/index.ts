import pgClient from './database';
import app from './app';

//-----init db--
const connectdb = async() =>{
    try{
        await pgClient.connect();
        console.log('postgresql online');
    }catch (err){
        console.log(err);
    }
}
connectdb();

//-----init app--
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`server on port ${port}`);
});


//-----For testing

export default app;
