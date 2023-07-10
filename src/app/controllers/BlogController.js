class BlogController {
    //[GET] /blogs/create
    create(req, res, next) {
        res.render('blogs/create-blog')
    }

    //[GET] /blogs/view-blog
    view(req, res, next) {
        res.render('blogs/view-blog')
    }
}

module.exports = new BlogController();