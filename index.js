const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
const app = express();

// MongoDB Connection
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// Home Page
app.get('/', function (req, res) {
  res.send('React E-Commerce API');
});

// Products Route
app.get('/products', async function (req, res) {
  const products = await Product.find();
  console.log(products);
  if (products) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error('No products found');
  }
});

// Single Product Route
app.get('/products/:id', async function (req, res) {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

app.listen(process.env.PORT || 3000);
