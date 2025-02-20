const express = require('express');
const bodyParser = require('body-parser');  
const db = require('./config/db');
const userRoutes = require('./routes/userApi');
const productRoutes= require("./routes/productApi")
const orderRoutes= require("./routes/orderApi")

const app = express();

// middleware
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/upload', express.static('uploads'))

// test route
app.get('/', (req, res) => {
    res.send('API is running');
});

module.exports = app;
