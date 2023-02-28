import mongoose from "mongoose";
import { MONGO_CONNECTION_URL } from "./config"


const url = MONGO_CONNECTION_URL

function connectDB() {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected. ');
    }).on('error', err => {
        console.log('error')
    });
}

export default connectDB;
