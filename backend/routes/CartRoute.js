import express from 'express';
import { CartModel } from '../models/Cart.js'; // Adjust the path if necessary

const router = express.Router();

// Create a new cart
router.post('/', async (req, res) => {
  const { _id, userId, merchandise } = req.body;

  try {
    const newCart = new CartModel({
      _id,
      userId,
      merchandise
    });

    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: 'Error creating cart', error });
  }
});

// Get all carts
router.get('/', async (req, res) => {
  try {
    const carts = await CartModel.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carts', error });
  }
});

// Get a single cart by ID
router.get('/:id', async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error });
  }
});

// Update a cart by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
});

// Delete a cart by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCart = await CartModel.findByIdAndDelete(req.params.id);
    if (!deletedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cart', error });
  }
});

export { router };
