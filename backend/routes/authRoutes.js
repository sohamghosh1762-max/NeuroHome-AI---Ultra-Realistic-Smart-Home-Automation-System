const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    // Demo Login
    if (
        email === "admin@gmail.com" &&
        password === "123456"
    ) {

        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            token,
            user: { email }
        });
    }

    res.status(401).json({
        message: "Invalid credentials"
    });

});

module.exports = router;