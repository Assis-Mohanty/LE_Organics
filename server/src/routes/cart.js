const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

// Get cart items
router.get('/', auth, async (req, res) => {
  try {
    // In a real application, you might want to store cart items in the database
    // For this example, we'll use the session
    const cart = req.session.cart || [];
    const populatedCart = await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findById(item.product);
        return {
          product: {
            _id: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            stock: product.stock
          },
          quantity: item.quantity
        };
      })
    );
    res.json(populatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to cart
router.post('/add', [
  auth,
  body('productId').isMongoId().withMessage('Invalid product ID'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, quantity } = req.body;

    // Check if product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Initialize cart if it doesn't exist
    if (!req.session.cart) {
      req.session.cart = [];
    }

    // Check if product is already in cart
    const existingItem = req.session.cart.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      // Update quantity if product exists
      existingItem.quantity += quantity;
    } else {
      // Add new item if product doesn't exist
      req.session.cart.push({
        product: productId,
        quantity
      });
    }

    res.json(req.session.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item quantity
router.put('/update/:productId', [
  auth,
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId } = req.params;
    const { quantity } = req.body;

    // Check if product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Find and update cart item
    const cartItem = req.session.cart.find(
      item => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cartItem.quantity = quantity;
    res.json(req.session.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    // Remove item from cart
    req.session.cart = req.session.cart.filter(
      item => item.product.toString() !== productId
    );

    res.json(req.session.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    req.session.cart = [];
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 