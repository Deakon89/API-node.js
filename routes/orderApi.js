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

// get by date
router.get('/orders_item/date', (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
        return res.status(400).json({ error: 'specify parameter' });
    }
    Order.getByDate(start, end, (err, results) => {
        if (err) return res.status(500).json({ error: 'database error' });
        res.json(results);
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

// delete order
router.delete('/orders_item/:id', (req, res) => {
    const { id } = req.params;
    Order.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: 'database error' });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'order not found' });
        }
        res.status(200).json({ message: 'order deleted' });
    });
    
});

module.exports=router;