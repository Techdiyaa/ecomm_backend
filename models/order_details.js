const mongoose = require('mongoose');

const order_detail_schema = new mongoose.Schema({
    omid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Oder_Master'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const order_detail = mongoose.model('order_detail', order_detail_schema);

module.exports = order_detail;
