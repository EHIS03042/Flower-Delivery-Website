        // backend/controllers/authController.js
    const User = require("../models/userModel");
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");

    /**
     * @desc Register a new user
     * @route POST /api/auth/register
     * @access Public
     */
    exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1️⃣ Validate required fields
        if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
        }

        // 2️⃣ Validate password strength
        const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error:
            "Weak password. Use at least 8 characters, including uppercase, lowercase, number, and symbol.",
        });
        }

        // 3️⃣ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
        }

        // 4️⃣ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5️⃣ Create new user
        const user = await User.create({
        name,
        email,
        password: hashedPassword,
        });

        // 6️⃣ Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
        });

        // 7️⃣ Remove password before sending response
        const { password: _, ...userWithoutPassword } = user._doc;

        // 8️⃣ Send clean response
        res.status(201).json({
        token,
        user: userWithoutPassword,
        });
    } catch (err) {
        console.error("Error in registerUser:", err);
        res.status(500).json({ error: "Server error" });
    }
    };

    /**
     * @desc Login user
     * @route POST /api/auth/login
     * @access Public
     */
    exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Validate fields
        if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
        }

        // 2️⃣ Find user by email
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
        }

        // 3️⃣ Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
        }

        // 4️⃣ Generate new JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
        });

        // 5️⃣ Remove password before sending
        const { password: _, ...userWithoutPassword } = user._doc;

        res.json({
        token,
        user: userWithoutPassword,
        });
    } catch (err) {
        console.error("Error in loginUser:", err);
        res.status(500).json({ error: "Server error" });
    }
    };
