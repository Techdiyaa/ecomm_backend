const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const product_model = new mongoose.Schema({
    pcode: {
        type: String,
        required: true,
    },
    pname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    photo: {
        type: String 
    }
}, { timestamps: true });

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

product_model.virtual('photo_path').get(function() {
    if (this.photo) {
        return '/uploads/' + this.photo;
    }
    return '';
});

const Product = mongoose.model('Product', product_model);

module.exports = {
    Product: Product,
    upload: upload
};
