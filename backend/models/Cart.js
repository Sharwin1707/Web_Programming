import mongoose from "mongoose";

const cartMerchandiseSchema = new mongoose.Schema({
    merchandiseId: String,
    cartQuantity: Number,
    cartDate: Date,
  });
  
  const cartSchema = new mongoose.Schema({
    _id: String,
    userId: String,
    merchandise: [cartMerchandiseSchema],
  });
  
  export const CartModel = mongoose.model("Cart", cartSchema);
  