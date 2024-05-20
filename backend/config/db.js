import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DatabaseConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB);
        console.log('Connected to database: ' + connect.connection.host);
    } catch (e) {
        console.log('Error connecting to database: ' + e);
    }
};

export default DatabaseConnection;
