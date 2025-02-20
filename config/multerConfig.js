const multer = require("multer");
const path = require("path");


// config upload file
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "upload/"); //immage directory 
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));

    }
});

// type img filter
const fileFilter= (req, file, cb)=>{
    // allowed img types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'image/webp'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    } else{
        cb(new Error('insert only jpeg, png, gif, jpg, webp'), false)
    }   
};

//multer instace
const upload = multer({storage, fileFilter});

module.exports = upload;


