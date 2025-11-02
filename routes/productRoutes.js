const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fs = require('fs');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    console.log("Products from DB:", products);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/load', async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./product.json', 'utf-8'));
    await Product.deleteMany();
    const result = await Product.insertMany(data);
    res.json({ message: 'Products loaded successfully!', count: result.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
