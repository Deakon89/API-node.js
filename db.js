const mysql= require("mysql2");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"data_db"
});

connection.connect(err=>{
    if(err){
        console.error("error connecting: "+err.stack);
        return;
    }
    console.log("connected to data base");
});

module.exports=connection;  

