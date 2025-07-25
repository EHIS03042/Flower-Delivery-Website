    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');
    const validator = require('validator');

    const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
        return !this.googleId;
        }
    },
    googleId: {
        type: String,
        default: null
    },
    cartData: {
        type: Object,
        default: {}
    }
    }, { minimize: false });

    // Signup static method
    userSchema.statics.signup = async function (name, email, password) {
    if (!name || !email || !password) {
        throw Error('All fields are required');
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid email');
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Weak password. Use at least 8 characters, including uppercase, lowercase, number, and symbol.');
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ name, email, password: hash });
    return user;
    };

    // Login static method
    userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields are required');
    }

    const user = await this.findOne({ email });
    if (!user || !user.password) {
        throw Error('Invalid email or user uses Google login');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password');
    }

    return user;
    };

    module.exports = mongoose.model('User', userSchema);
