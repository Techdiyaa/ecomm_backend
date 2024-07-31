const mongoose = require('mongoose');

const order_master_schema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    datetime: {
        type: Date,
        required: true
    }
}, { timestamps: true });

const order_master = mongoose.model('OrderDetail', order_master_schema);

module.exports = order_master;
