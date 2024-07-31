const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/register_model');
const generateToken = require('../token/generateToken');

const registerUser = async (req, res) => {
    try {
        const { fullname, mobile, email, country, state, city, pincode, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname,
            mobile,
            email,
            country,
            state,
            city,
            pincode,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = await generateToken({ _id: user._id });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid current password' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editProfile = async (req, res) => {
    try {
        const { email, fullname, mobile, country, state, city, pincode } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        user.fullname = fullname || user.fullname;
        user.mobile = mobile || user.mobile;
        user.country = country || user.country;
        user.state = state || user.state;
        user.city = city || user.city;
        user.pincode = pincode || user.pincode;
        await user.save();
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser, changePassword, editProfile };
