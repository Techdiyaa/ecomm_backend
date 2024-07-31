const generateToken = require('../token/generateToken.js');
const Admin = require('../models/admin_model.js');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        if (password !== admin.password) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const tokenData = await generateToken({ _id: admin._id });
        console.log(tokenData);

        res.status(200).json({
            id:admin._id,
            token: tokenData.token
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const changePassword = async(req,res)=>{
    try {
        const {currentPassword,newPassword} = req.body;
        if(!currentPassword || !newPassword)
        {
            return res.status(400).json({ error: "Current and new password are required" });
        }
        const admin = await Admin.findById(req.user._id);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        if(admin.password!=currentPassword)
        {
            return res.status(400).json({ error: "Current password is incorrect" });

        }
        if(admin.password == currentPassword)
        {
            admin.password = newPassword;
            await admin.save();
        }
        res.status(200).json({message:"password change successfully"})
    } catch (error) {
        
    }
}

const signup = async(req,res) => {
    const admin = new Admin(req.body);
    try {
        await admin.save();
        return res.status(201).send(admin);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = {
    login,
    signup,
    changePassword,
    getAllAdmins
};
