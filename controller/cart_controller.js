const OrderDetail = require('../models/order_details');
const generateToken = require('../token/generateToken.js');

exports.addToCart = async (req, res) => {
    try {
        const { pid, quantity } = req.body;
        const userid = req.user.id; 
        const orderDetail = new OrderDetail({ pid, userid, quantity });
        await orderDetail.save();
        res.status(201).json(orderDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


exports.updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const userid = req.user.id; 
        const orderDetail = await OrderDetail.findOneAndUpdate({ _id: id, userid }, { quantity }, { new: true });
        
        if (!orderDetail) {
            return res.status(404).json({ msg: 'Item not found in the user cart' });
        }

        res.json(orderDetail);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


exports.deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const userid = req.user.id; 
        const deletedItem = await OrderDetail.findOneAndDelete({ _id: id, userid });

        if (!deletedItem) {
            return res.status(404).json({ msg: 'Item not found in the user cart' });
        }

        res.json({ msg: 'Item removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const token = await generateToken({ _id: userId });
        req.headers.authorization = `Bearer ${token}`;
        const cartItems = await OrderDetail.find({ userId }).populate('pid');
        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};