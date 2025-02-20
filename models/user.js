
const db = require('../config/db');

const user = {
    // create user
    create: (name,email,callback) =>{
        const sql = "INSERT INTO users(name,email) VALUES(?,?)";
        db.query(sql,[name,email],callback);
    },
    // get all users
    getAll: (callback) => {
        const sql = "SELECT id,name,email FROM users";
        db.query(sql,callback);
    },
    // get user by id
    getById: (id,callback) => {
        const sql = "SELECT id,name,email FROM users WHERE id = ?";
        db.query(sql,[id],callback);
    },
    // update user
    update: (id,name,email,callback) => {
        const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
        db.query(sql,[name,email,id],callback);
    },
    // delete user
    delete: (id,callback) => {
        const sql = "DELETE FROM users WHERE id = ?";
        db.query(sql,[id],callback);
    }
}

module.exports = user;