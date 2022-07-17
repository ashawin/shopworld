
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter the name'],
        maxlength: [30, 'Name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please Enter the email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please Enter the password'],
        minlength: [6, 'Password should be longer than 6 characters '],
        select: false,
    },
    avvatar: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparepassword = async function (mypassword) {

    return await bcrypt.compare(mypassword, this.password)

}

userSchema.methods.getJwtToken = function () {
    
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME })
}

userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest;
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken;
}
module.exports = mongoose.model('User', userSchema)