import express from 'express';
import { PurchaseHistory } from '../models/PurchaseHistory.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();


// Fetch all purchase history for a user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const purchaseHistory = await PurchaseHistory.findOne({ userId });
      if (!purchaseHistory) {
        return res.status(404).json({ message: 'No purchase history found' });
      }
      res.status(200).json(purchaseHistory.orders);
    } catch (error) {
      console.error("Error fetching purchase history:", error);
      res.status(500).json({ message: 'Error fetching purchase history', error: error.message });
    }
  });
  
  // Add a new purchase history entry
  router.post('/', async (req, res) => {
    const {
      userId,
      receiptVoucher,
      discount,
      merchandise,
      totalPrice,
      invoiceNumber,
      invoiceDate,
      deliveryCharges,
      totalPaid,
      deliveryStatus
    } = req.body;
  
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    const newOrder = {
      receiptVoucher,
      discount,
      merchandise,
      totalPrice,
      invoiceNumber,
      invoiceDate,
      deliveryCharges,
      totalPaid,
      deliveryStatus
    };
  
    try {
      let purchaseHistory = await PurchaseHistory.findOne({ userId });
  
      if (!purchaseHistory) {
        purchaseHistory = new PurchaseHistory({ userId, orders: [newOrder] });
      } else {
        purchaseHistory.orders.push(newOrder);
      }
  
      const savedPurchaseHistory = await purchaseHistory.save();
      res.status(201).json(savedPurchaseHistory);
    } catch (error) {
      console.error("Error adding purchase history:", error);
      res.status(500).json({ message: 'Error adding purchase history', error: error.message });
    }
  });
  


export { router };// Ensure you export the router correctly
