import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import DatabaseConnection from './config/db.js';
dotenv.config()

const PORT = process.env.PORT || 5000

const app = express();

DatabaseConnection()

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})