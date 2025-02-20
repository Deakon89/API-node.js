const express = require("express");
const router = express.Router();
const db = require("../config/db");
const Product = require("../models/product");
const upload = require('../config/multerConfig');

// get all product
router.get("/product", (req,res) => {
    Product.getAll((err, result)=>{
        if(err){
            return res.status(500).json ({error:"database error"});
        }
        res.json(result);
    })
});
// get product by id
router.get("/product/:id", (req,res) => {
    Product.getById(req.params.id,(err, result)=>{
        if(err){
            return res.status(500).json ({error:"database error"});
        }
        if(result.lenght === 0){
            return res.status(404).json ({error:"product not found"});
        }
        res.json(result[0]);
    })
});
// create product
router.post("/product", upload.single("image"), (req,res) => {
    const {name, type, price, stock}=req.body;
    if (!name || !price || !stock ){
        return res.status(400).json ({error:"secify parameter"});
    }

    const imageUrl = req.file ? `/upload/${req.file.filename}` : null;
    const newProduct = { name, type, price, stock, image: imageUrl };

    Product.create(newProduct, (err, result)=>{
        if(err){
            return res.status(500).json ({error:"database error"});
        }
        res.status(201).json({message:"created product", productId: result.insertId});
    })
});
// update product
router.put("/product/:id", upload.single("image"), (req,res) => {
    const productId = req.params.id;
    const {name, type, price, stock}=req.body;
    const image = req.file ? `/upload/${req.file.filename}` : null;
    console.log(req.file);
    if (!name || !price || !stock ){
        return res.status(400).json ({error:"secify parameter"});
    }
    let sql= "UPDATE product SET name=?, type=?, price=?, stock=?";
    let values = [name, type, price, stock];
    if(image){
        sql += ", image=?";
        values.push(image);
    }
    sql += " WHERE id=?";
    values.push(productId);
    db.query(sql, values, (err)=>{
        if(err){
            return res.status(500).json ({error:"database error"});
        }
        res.json({message:"product updated"});
    })
});

// delete product
router.delete("/product/:id", (req, res) => {
    const { id } = req.params;
    
    Product.delete(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "database error or the product is ordered" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "product not found" });
        }
        res.status(200).json({ message: "product deleted" });
    });
});

module.exports=router;