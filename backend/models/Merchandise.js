import mongoose from "mongoose";

const merchandiseSchema = new mongoose.Schema({
    merchantId : String,
    price: Number,
    rating: Number,
    description: String,
    quantity: Number,
    type: String,
    tag: String,
    image: String,
    name: String
  });
  
  export const MerchandiseModel = mongoose.model("Merchandise", merchandiseSchema);
  