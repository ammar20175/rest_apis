import dotenv from 'dotenv'
dotenv.config();

export const {
    APP_PORT,
    DEBUG_MODE,
    MONGO_CONNECTION_URL,
    JWT_KEY
} = process.env
