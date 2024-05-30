import express from 'express';
import { CustomerOrderModel } from '../models/CustomerOrder.js'; 

const router = express.Router();

// Create a new customer order
router.post('/', async (req, res) => {
  const { _id, orderDate, customerFirstName, customerLastName, customerAddress, merchandiseOrders } = req.body;

  try {
    const newOrder = new CustomerOrderModel({
      _id,
      orderDate,
      customerFirstName,
      customerLastName,
      customerAddress,
      merchandiseOrders
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// Get all customer orders
router.get('/', async (req, res) => {
  try {
    const orders = await CustomerOrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

// Get a single customer order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await CustomerOrderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error });
  }
});

// Update a customer order by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await CustomerOrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
});

// Delete a customer order by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await CustomerOrderModel.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
});

export { router };
