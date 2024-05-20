import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DatabaseConnection from './config/db.js';
import { router as UserRoute } from './routes/UserRoute.js';


dotenv.config()
DatabaseConnection()

const PORT = process.env.PORT || 5000 
const app = express();
app.use(express.json());


app.use('/users', UserRoute);






app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})