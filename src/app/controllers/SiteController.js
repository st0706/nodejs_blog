class SiteController {
    //[GET] /
    index(req, res, next) {
        if (req.session.username) {
            res.render('home', { isLoginView: true, username: req.session.username });
        } else {
            res.render('home');
        }
    }

    //[GET] /logout
    logout(req, res, next) {
        req.session.destroy(err => {
            if (err) {
                console.log(err);
            }
            res.redirect('/');
        });
    }
}

module.exports = new SiteController();
