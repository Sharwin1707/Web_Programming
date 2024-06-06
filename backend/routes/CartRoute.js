import express from 'express';
import { CartModel } from '../models/Cart.js'; // Adjust the path if necessary

const router = express.Router();

// Create a new cart
router.post("/add", async (req, res) => {
  const { productId, quantity, username, name, type, price, image } = req.body;

  try {
    // Find the user's cart
    let cart = await CartModel.findOne({ userId: username });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new CartModel({ userId: username, merchandise: [] });
    }

    // Find if the product already exists in the cart
    const existingProductIndex = cart.merchandise.findIndex(
      (item) => item.merchandiseId === productId
    );

    if (existingProductIndex !== -1) {
      // If product exists, update the quantity
      cart.merchandise[existingProductIndex].cartQuantity += quantity;
    } else {
      // If product doesn't exist, add a new product to the cart
      cart.merchandise.push({ merchandiseId: productId, cartQuantity: quantity, merchName: name, merchType: type, merchPrice: price, merchImage: image  });
    }

    await cart.save();
    res.status(200).send("Item added to cart");
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).send("Internal Server Error");
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

// Get all carts by UserID
router.get('/user/:userId', async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'No cart found for this user' });
    }
    res.status(200).json(cart.merchandise);
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

// Update a specific item in the cart
router.put('/update/:userId/:merchandiseId', async (req, res) => {
  const { userId, merchandiseId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await CartModel.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart and update its quantity
    const item = cart.merchandise.find(item => item.merchandiseId === merchandiseId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.cartQuantity = quantity;

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
});

// Delete a specific item from a user's cart
router.delete('/item/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    const result = await CartModel.updateOne(
      { 'merchandise.merchandiseId': itemId },
      { $pull: { merchandise: { merchandiseId: itemId } } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error("Error deleting cart item:", error); // Enhanced error logging
    res.status(500).json({ message: 'Error deleting cart item', error: error.message });
  }
});
// Delete all cart items for a user
router.delete('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await CartModel.deleteMany({ userId }); // Deletes all cart items for the user
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    console.error("Error deleting cart:", error); // Enhanced error logging
    res.status(500).json({ message: 'Error deleting cart', error: error.message });
  }
});


export { router };
