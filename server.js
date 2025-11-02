const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Express + MongoDB API 🚀 (Users & Products)');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
