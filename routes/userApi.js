const express = require('express');
const router = express.Router();
const User = require('../models/user');

// create users
router.post('/users', (req, res) => {
    console.log(req.body);
    const { name, email } = req.body;
    
    User.create(name, email,(err, result)=>{
        if (err) {
            return res.status(500).json({error: "database error"});
        }
        res.status(201).json({message: "user created", id: result.insertId});        
    });
});
// getall users
router.get('/users', (req, res) => {
    
    User.getAll((err, users)=>{
        if (err) {
            return res.status(500).json({error: "database error"});
        }
        res.status(200).json(users);        
    });
});
// get users by id
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    User.getById(id, (err, user)=>{
        if (err) {
            return res.status(500).json({error: "database error"});
        }
        if (!user.length) {
            return res.status(404).json({error: "user not found"});
        }
            res.status(200).json(user);       
    });
});
// update users
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    User.update(id, name, email, (err, user)=>{
        if (err) {
            return res.status(500).json({error: "database error"});
        }
            res.status(200).json(user);       
    });
});
// delete users
router.delete('/users/:id', (req, res, next) => {
    const { id } = req.params;
    
    User.delete(id, (err, result) => {
        if (err) return next(err);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "user not found" });
        }
        res.status(200).json({ message: "user deleted" });
    });
});


module.exports = router;