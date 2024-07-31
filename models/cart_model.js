const mongoose = require('mongoose');

const order_detail_schema = new mongoose.Schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    quantity: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const order_detail = mongoose.model('order_detail', order_detail_schema);

module.exports = order_detail;
