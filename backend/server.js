import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DatabaseConnection from "./config/db.js";
import { router as UserRoute } from "./routes/UserRoute.js";
import { router as BookingRoute } from "./routes/BookingRoute.js";
import jwt from 'jsonwebtoken'

dotenv.config();
DatabaseConnection();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

//user routes
app.use("/users", UserRoute);

//booking routes
app.use("/bookings", BookingRoute);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});



