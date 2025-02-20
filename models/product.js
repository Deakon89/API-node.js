
const db = require('../config/db');


const Product = {
        // create product
     create: (productData, callback) => {
        const { name, type, price, stock, image } = productData;
        const sql = 'INSERT INTO product (name, type, price, stock, image) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [name, type, price, stock, image], callback);
    },
    
        // get all product
     getAll: (callback) => {
        const sql = 'SELECT * FROM product';
        db.query(sql, callback);
    },
   
    
    //update product
     update:(id, name, type, price, stock, image, callback) => {
         db.query("UPDATE product SET name=?, type=?, price=?, stock=?, image=? WHERE id=?",
            [name,type,price,stock,image,id],
            callback 
         );
     },
    //  get product by id
     getById:(id, callback) => {
         db.query("SELECT * FROM product WHERE id=?",[id], callback);
     },
    // Delete a product by its ID
    delete: (productId, callback) => {
        const sql = "DELETE FROM product WHERE id = ?";
        db.query(sql, [productId], callback);
    },

};

module.exports = Product;