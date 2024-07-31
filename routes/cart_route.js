const express = require('express');
const router = express.Router();
const OrderDetail = require('../models/order_details');
const generateToken = require('../token/generateToken');

const {
    addToCart,
    updateCartItem,
    deleteCartItem,
    getCartItems
} = require('../controllers/cart_controller');

router.post('/add', addToCart);

router.put('/update/:id', updateCartItem);

router.delete('/delete/:id', deleteCartItem);

router.get('/', async (req, res) => {
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
});

module.exports = router;
