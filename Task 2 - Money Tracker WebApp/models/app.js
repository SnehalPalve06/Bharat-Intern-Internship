// models/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/moneydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Transaction model
const Transaction = mongoose.model('Transaction', {
  description: String,
  amount: Number,
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Route to get all transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to add a new transaction
app.post('/api/transactions', async (req, res) => {
  const { description, amount } = req.body;

  try {
    const newTransaction = new Transaction({ description, amount });
    await newTransaction.save();

    res.json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
