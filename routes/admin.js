// Import required modules and models
const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../token/generateToken'); // Assuming you have middleware for JWT authentication
const { login, signup, changePassword } = require('../controllers/adminController');
const { Product, upload } = require('../model/product_model');

// Routes for admin authentication
router.post('/login', login);
router.post('/signup', signup);
router.post('/change-password', jwtMiddleware, changePassword); // Middleware to authenticate using JWT token

// Routes for product management
router.post('/products', jwtMiddleware, upload.single('photo'), async (req, res) => {
    try {
        // Create a new product
        const { pcode, pname, description, price } = req.body;
        const photo = req.file ? req.file.filename : null; // Assuming multer middleware is used for file upload
        const product = new Product({ pcode, pname, description, price, photo });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/products', async (req, res) => {
    try {
        // Get all products
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        // Get a specific product by ID
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/products/:id', jwtMiddleware, upload.single('photo'), async (req, res) => {
    try {
        // Update a product by ID
        const { pcode, pname, description, price } = req.body;
        const photo = req.file ? req.file.filename : null;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { pcode, pname, description, price, photo }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete('/products/:id', jwtMiddleware, async (req, res) => {
    try {
        // Delete a product by ID
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
