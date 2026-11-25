
const users = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// REGISTER
exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body

        // Check whether user already exists
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const newUser = await users.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        })
    }
    catch (error) {
        next(error)
    }
}


// LOGIN
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Check user
        const existingUser = await users.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, existingUser.password)

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                userId: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                token
            }
        })
    }
    catch (error) {
        next(error)
    }
}
