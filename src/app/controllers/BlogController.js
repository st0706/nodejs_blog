class BlogController {
    //[GET] /me
    create(req, res, next) {
        res.render('blogs/create-blog')
    }
}

module.exports = new BlogController();