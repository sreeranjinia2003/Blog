
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login first"
        })
    }

    try {
        const jwtResponse = jwt.verify(token, process.env.JWT_SECRET)

        req.payload = jwtResponse.userId

        next()
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
}

module.exports = authMiddleware
