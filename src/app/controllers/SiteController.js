class SiteController {
    //[GET] /
    index(req, res, next) {
        res.render('home')
    }

    //[GET] /isLogin
    isLogin(req, res, next) {
        res.render('home', { isLoginView: true })
    }
}

module.exports = new SiteController();