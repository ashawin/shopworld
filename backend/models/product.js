const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product'],
        trim: true,
        maxlength: [100, 'Product length cannot exceed 100']
    },
    price: {
        type: Number,
        required: [true, 'Please enter price'],
        maxlength: [5, 'Product price  cannot exceed 5'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true

            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'please select category for this product'],
        enum: {
            values: ['Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Food',
                'Book',
                'Headphones',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home',
            ],
            message: 'Please select correct category for this product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: String,
        required: [true, 'Please enter product stock'],
        maxlength: [5, 'Product stock cannot exceed 5'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);