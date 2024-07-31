const Product = require('../models/product_model').Product;

exports.addProduct = async (req, res) => {
    try {
        const { pcode, pname, description, price } = req.body;
        const photo = req.file ? req.file.filename : null;
        const product = new Product({ pcode, pname, description, price, photo });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { pcode, pname, description, price } = req.body;
        const photo = req.file ? req.file.filename : null;
        const product = await Product.findByIdAndUpdate(id, { pcode, pname, description, price, photo }, { new: true });
        
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json({ msg: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
