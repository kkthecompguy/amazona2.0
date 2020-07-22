const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const products = require('./routes/products');
const order = require('./routes/order');
const users = require('./routes/users');


const app = express();

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost/amazona20", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  console.log('MongoDB connected...');
}

connectDB();

// Init middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', products);
app.use('/api/orders', order);
app.use('/api/users', users);


app.get('/', (req, res) => {
  res.send('API RUNNING..');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));