const express = require("express");
const router = express.Router();
const Order = require("../models/orders_item");

// create order
router.post('/orders_item', (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    
    if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ error: 'specify parameter' });
    }

    Order.create({ user_id, product_id, quantity }, (err, result) => {
        if (err) {
            // stock controll
            if (err.message) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: 'database error' });
        }
        res.status(201).json({ message: 'created order!', orderId: result.insertId });
    });
});

// get all orders
router.get('/orders_item', (req, res) => {
    Order.getAll((err, results) => {
        if (err) return res.status(500).json({ error: 'database error' });
        res.json(results);
    });
});

// get order by user id
router.get('/orders_item/user/:user_id', (req, res) => {
    const { user_id } = req.params;
    Order.getByUserId(user_id, (err, results) => {
        if (err) return res.status(500).json({ error: 'database error' });
        res.json(results);
    });
});

module.exports=router;