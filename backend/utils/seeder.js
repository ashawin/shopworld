const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const product = require('../data/products.json');


dotenv.config({ path: 'backend/config/config.env' });

connectDatabase();

const seedProduct = async () => {
    try {

        await Product.deleteMany();
        console.log('Products are deleted');
        await Product.insertMany(product)
        console.log('all products are added ')
        process.exit();
    } catch (error) {

        console.log(error.message);
        process.exit();
    }
}

seedProduct();