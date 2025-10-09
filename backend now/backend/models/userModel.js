    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');
    const validator = require('validator');

    const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true  // prevent whitespace issues
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // makes email comparisons more reliable
        trim: true
    },
    password: {
        type: String,
        required: function () {
        return !this.googleId; // handles Google-only users
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


    // Static method for signup
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

    const existingUser = await this.findOne({ email });
    if (existingUser) {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ name, email, password: hash });
    return user;
    };


    // Static method for login
    userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields are required');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Invalid email');
    }

    if (!user.password) {
        throw Error('Account uses Google login. Try signing in with Google.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw Error('Incorrect password');
    }

    return user;
    };


    module.exports = mongoose.model('User', userSchema);

