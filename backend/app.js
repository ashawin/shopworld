const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser());
const errorMiddleare = require('./middlewares/errors')


const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');



app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use(errorMiddleare);

module.exports = app;