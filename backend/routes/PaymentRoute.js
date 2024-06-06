import express from "express";
import { PaymentModel } from "../models/Payment.js"; // Ensure the import matches the export in Payment.js
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Save a new payment
router.post('/', async (req, res) => {
  const { userId, cartItems, totalPrice, paymentMethod, billingAddress, cardDetails } = req.body;
  
  console.log("Received data:", req.body);

  try {
    const newPayment = new PaymentModel({
      userId,
      cartItems,
      totalPrice,
      paymentMethod,
      billingAddress,
      cardDetails
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Error saving payment', error });
  }
});


export { router };// Ensure you export the router correctly
