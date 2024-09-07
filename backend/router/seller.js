const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const Order = require("../models/order");
const auth = require("../middleware/middleware")

router.post("/products", async (req, res) => {
  const { title, image, price, description } = req.body;

  try {
    const newProduct = new Product({ title, image, price, description });
    await newProduct.save();
    res.status(201).json({ message: "Product created", newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { title, image, price, description } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { title, image, price, description }, { new: true });
    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});
router.post("/add-product", auth, async (req, res) => {
    const { title, price, description, imageUrl } = req.body;
    try {
      const product = new Product({
        title,
        price,
        description,
        imageUrl,
        sellerId: req.userId,
      });
      await product.save();
      res.json({ msg: "Product added successfully" });
    } catch (err) {
      res.status(500).json({ msg: "Server Error" });
    }
  });
  
  router.get("/orders", auth, async (req, res) => {
    try {
      const orders = await Order.find({ sellerId: req.userId });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ msg: "Server Error" });
    }
  });
module.exports = router;