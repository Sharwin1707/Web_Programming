import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DatabaseConnection from "./config/db.js";
import { router as UserRoute } from "./routes/UserRoute.js";
import { router as BookingRoute } from "./routes/BookingRoute.js";
import { router as ProfileRoute } from "./routes/ProfileRoute.js";
import { router as ImageRoute } from "./routes/ImageRoute.js";
import { router as MerchandiseRoute } from "./routes/MerchandiseRoute.js";
import multer from "multer";

dotenv.config();
DatabaseConnection();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//user routes
app.use("/users", UserRoute);

//booking routes
app.use("/bookings", BookingRoute);

app.use("/profile", ProfileRoute);

app.use('/images', ImageRoute);

//merchandise routes
app.use("/merchandise", MerchandiseRoute);



app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
