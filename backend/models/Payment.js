import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cartItems: [
    {
      merchandiseId: { type: String, required: true },
      merchName: { type: String, required: true },
      merchType: { type: String, required: true },
      merchPrice: { type: Number, required: true },
      cartQuantity: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  billingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String },
    postcode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true }
  },
  cardDetails: {
    nameOnCard: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiration: { type: String, required: true },
    cvv: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

export const PaymentModel = mongoose.model("Payment", paymentSchema);
