// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const multer = require('multer');
// const path = require('path');
// const { login, signup, changePassword,getAllAdmins } = require('./controller/admin_controller');
// const { addProduct, updateProduct, deleteProduct } = require('./controller/admin_pro_controller');
// const generateToken = require('./token/generateToken');
// const errorMiddleware = require('./middleware/errorMiddleware');
// const validate = require('./middleware/validationMiddleware');
// const { upload } = require('./models/product_model');

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Database connection
// mongoose.connect('mongodb://localhost:27017/ecomm_db', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));

// // Routes
// app.post('/login', login);
// app.post('/signup', signup);
// app.post('/changePassword', validate, changePassword);
// app.post('/addProduct', upload.single('photo'), addProduct);
// app.put('/updateProduct/:id', upload.single('photo'), updateProduct);
// app.delete('/deleteProduct/:id', deleteProduct);
// app.get('/admins', getAllAdmins);

// // Error handling middleware
// app.use(errorMiddleware);

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { login, signup, changePassword, getAllAdmins } = require('./controller/admin_controller');
const { addProduct, updateProduct, deleteProduct } = require('./controller/admin_pro_controller');
const generateToken = require('./token/generateToken');
const errorMiddleware = require('./middleware/errorMiddleware');
const validate = require('./middleware/validationMiddleware');
const { upload } = require('./models/product_model');
const router = require('./routes/user_route');
console.log(router);
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect('mongodb://localhost:27017/ecomm_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.post('/login', login);
app.post('/signup', signup);
app.post('/changePassword', validate, changePassword);
app.post('/addProduct', upload.single('photo'), addProduct);
app.put('/updateProduct/:id', upload.single('photo'), updateProduct);
app.delete('/deleteProduct/:id', deleteProduct);
app.get('/admins', getAllAdmins);
app.use('/api/users', router);  

// Error handling middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
