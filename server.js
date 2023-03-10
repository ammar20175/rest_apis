import express from 'express';
import { APP_PORT } from './config';
import errorHandler from './middlewares/errorHandler';
import router from './routes';
import connectDB from './database';
import path from 'path'

const app = express();

connectDB();

global.appRoot = path.resolve(__dirname);


//paring
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use('/api', router);


app.use('/uploads',express.static('public'))
//middleware for errors.It must be in the last
app.use(errorHandler);

app.listen(APP_PORT, () => {
    console.log(`listening on port ${APP_PORT}`)
})