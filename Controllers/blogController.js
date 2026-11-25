
const blogs = require('../Models/blogModel')

//create blog
exports.createBlogController = async (req, res) => {
    try {
        const { title, content } = req.body

        const newBlog = await blogs.create({
            title,
            content,
            author: req.payload
        })

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: newBlog
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllBlogsController = async (req, res) => {
    try {
        const allBlogs = await blogs.find()

        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            data: allBlogs
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// UPDATE BLOG
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, content } = req.body

        const updatedBlog = await blogs.findOneAndUpdate({ _id: id, author: req.payload },{ title, content },{ new: true } )

        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found or you are not authorized to update it"
            })
        }

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
