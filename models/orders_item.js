const db = require("../config/db");

const Order={
    // create order and update stock
    create:(orderData,callback)=>{
        const{ user_id, product_id, quantity } = orderData;
        // stock qunatity
        const getProductSql='SELECT stock FROM product WHERE id = ?';

        db.query(getProductSql,[product_id],(err,results)=>{
            if(err) return callback(err);
            if(results.length===0){
                return callback({message:"product not found"});
            }
            const currentStock= results[0].stock;
            if(currentStock < quantity){
                return callback ({ message:"stock empty"})
            }
            // update stock
            const newStock= currentStock - quantity;
            const updateStockSql = 'UPDATE product SET stock = ? WHERE id = ?';
            db.query(updateStockSql,[newStock, product_id],(err,updatedResults)=>{
                if(err) return callback(err);
                // insert order
                const insertOrderSql= 'INSERT INTO orders_item (user_id, product_id, quantity) VALUES (?, ?, ?)';
                db.query(insertOrderSql, [user_id, product_id, quantity], (err,orderResults)=>{
                    if(err) return callback(err);
                    callback(null, orderResults)
                });
            });
        });    
    },
// all orders
    getAll: (callback) => {
        const sql = 'SELECT * FROM orders_item';
        db.query(sql, callback);
    },
// id order
    getByUserId: (user_id, callback) => {
        const sql = 'SELECT * FROM orders_item WHERE user_id = ?';
        db.query(sql, [user_id], callback);
    },
    // delete order
    delete: (orderId, callback) => {
        const sql = 'DELETE FROM orders_item WHERE id = ?';
        db.query(sql, [orderId], callback);
    },
    
};

module.exports=Order;