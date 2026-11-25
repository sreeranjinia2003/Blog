
const express = require('express')
const router = express.Router()

const userController = require('../Controllers/userController')
const authMiddleware = require('../Middleware/authMiddleware')
const blogController = require('../Controllers/blogController')

// Register API
router.post('/register', userController.registerController)

// Login API
router.post('/login', userController.loginController)

// Protected API (JWT testing)
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "You are authorized",
        userId: req.payload
    })
})
// blog API
router.post('/blogs', authMiddleware, blogController.createBlogController)
router.get('/blogs', blogController.getAllBlogsController)
router.put('/blogs/:id', authMiddleware, blogController.updateBlogController)
module.exports = router
