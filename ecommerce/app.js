//includes
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

//routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const port = process.env.PORT || 8000;

//app
const app = express();

//database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected");
})

mongoose.connection.on('error', (error) => {
    console.log(`Database connection error: ${error}`);
})


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes
app.use(authRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);






//Start app
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})