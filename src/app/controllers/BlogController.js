class BlogController {
    //[GET] /blogs/create
    create(req, res, next) {
        res.render('blogs/create-blog', { isLoginView: true, username: req.session.username })
    }

    //[GET] /blogs/view-blog
    view(req, res, next) {
        if (req.session.username) {
            res.render('blogs/view-blog', { isLoginView: true, username: req.session.username })
        }
        else {
            res.render('blogs/view-blog', { isLoginView: false })
        }
    }
}

module.exports = new BlogController();