const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const users = new Users({
            name,
            email,
            password: hashedPassword
        });

        await users.save();
        res.json({ message: "Registration successful" });

    } catch (error) {
        res.status(400).json({ message: "User already exists" });
    }
});

/* LOGIN */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        res.json({ message: "Login successful" });
    } else {
        res.status(400).json({ message: "Invalid credentials" });
    }
});

module.exports = router;
