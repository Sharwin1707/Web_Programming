import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DatabaseConnection from "./config/db.js";
import { router as UserRoute } from "./routes/UserRoute.js";
import { router as BookingRoute } from "./routes/BookingRoute.js";
import { router as ProfileRoute } from "./routes/ProfileRoute.js";
import { router as ImageRoute } from "./routes/ImageRoute.js";
import { router as MerchandiseRoute } from "./routes/MerchandiseRoute.js";
import { router as BookingHistoryRoute } from "./routes/BookingHistoryRoute.js";
import { router as CartRoute } from "./routes/CartRoute.js";
import { router as createEventRoute } from "./routes/createEventRoute.js";
import { router as PostForum } from "./routes/PostForumRoute.js";
import { router as emailRoute } from "./routes/emailRoute.js";
import { router as ArtistGalleryRoute } from "./routes/GalleryRoute.js"
import { router as paymentRoute } from "./routes/PaymentRoute.js"
import { router as purchaseHistoryRoute } from "./routes/PurchaseHistoryRoute.js"
import { router as voucherRoute } from "./routes/VoucherRoute.js"
import { router as CommentRoute} from "./routes/CommentRoute.js"

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

//booking history routes
app.use("/bookhistory", BookingHistoryRoute);

//profile management route
app.use("/profile", ProfileRoute);

//Image route
app.use("/images", ImageRoute);

//merchandise routes
app.use("/merchandise", MerchandiseRoute);

//cart routes
app.use("/cart", CartRoute);

//payment routes
app.use("/payment", paymentRoute);

//purcHistory routes
app.use("/purchasehistory", purchaseHistoryRoute);

//voucher routes
app.use("/voucher", voucherRoute);

//createEvent routes
app.use("/createEvent", createEventRoute);

//Posting forum routes
app.use("/post", PostForum);

//send email
app.use("/email", emailRoute);

//artist gallery
app.use("/gallery", ArtistGalleryRoute );

//Forum Comment
app.use("/Comment", CommentRoute );

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
