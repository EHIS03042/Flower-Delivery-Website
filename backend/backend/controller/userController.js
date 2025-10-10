    const jwt = require('jsonwebtoken');
    const User = require('../models/userModel');

    // Token creation 
    const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
    };

    // User signup controller
    exports.signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.signup(name, email, password);
        const token = createToken(user._id);
        res.status(201).json({ email: user.email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

    // User login controller
    exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };

    // Google OAuth controller
    exports.googleOAuthUser = async (req, res) => {
    const { name, email, googleId } = req.body;

    try {
        let user = await User.findOne({ googleId });

        if (!user) {
        user = await User.create({ name, email, googleId });
        }

        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    };
