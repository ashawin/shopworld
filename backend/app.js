const express = require('express');
const app = express();
var cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
const path=require('path');

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser());
const errorMiddleare = require('./middlewares/errors')


const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');


app.use(express.static(path.join(__dirname,"public","build")))
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);
app.get("*",async(req,res)=>{
    res.sendFile(path.join(__dirname,"public","build","index.html"))
})
app.use(errorMiddleare);

module.exports = app;