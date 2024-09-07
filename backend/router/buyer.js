const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const getRecommendations = require('../services/recommendation');

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});
router.post("/cart", auth, async (req, res) => {
    const { productId } = req.body;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      
      res.json({ msg: "Product added to cart" });
    } catch (err) {
      res.status(500).json({ msg: "Server Error" });
    }
  });
  router.post('/place-order', auth, async (req, res) => {
    const { products } = req.body;
  
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ msg: 'Invalid order request' });
    }
  
    try {
      const buyer = req.userId;
  
      const orderProducts = await Promise.all(
        products.map(async (item) => {
          const product = await Product.findById(item.product);
          if (!product) {
            throw new Error('Product not found');
          }
          return {
            product: product._id,
            quantity: item.quantity,
            price: product.price * item.quantity,
          };
        })
      );
  
      const totalAmount = orderProducts.reduce((sum, item) => sum + item.price, 0);
  
      const order = new Order({
        buyer,
        seller: orderProducts[0].product.seller,
        products: orderProducts,
        totalAmount,
      });
  
      await order.save();
      res.json({ msg: 'Order placed successfully', order });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
    const postalDetails = await getPostOfficeDetails(buyerPinCode);
    const trackingId = `INDPOST-${Date.now()}-${postalDetails.BranchType}`;

  order.trackingId = trackingId;
  await order.save();

  res.json({ msg: 'Order placed successfully', order });
});
router.get('/track-order/:trackingId', auth, async (req, res) => {
    const { trackingId } = req.params;
  
    try {
      const order = await Order.findOne({ trackingId });
      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }
  
      res.json({ msg: 'Order found', order });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
router.get('/recommendations', async (req, res) => {
  try {
    const recommendations = await getRecommendations(req.userId);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});
module.exports = router;