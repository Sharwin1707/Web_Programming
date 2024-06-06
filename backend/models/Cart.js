import mongoose from "mongoose";

const cartMerchandiseSchema = new mongoose.Schema({
  merchandiseId: String,
  cartQuantity: Number,
  merchName: String,
  merchType: String,
  merchPrice: Number,
  merchImage: String,
  cartDate: {
    type: Date,
    default: Date.now,
  },
});

const cartSchema = new mongoose.Schema({
  userId: String,
  merchandise: [cartMerchandiseSchema],
});

export const CartModel = mongoose.model("Cart", cartSchema);
  