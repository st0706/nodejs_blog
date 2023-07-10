class LoginController {
    //[GET] /authen/login
    login(req, res, next) {
        res.render('authen/login')
    }
}

module.exports = new LoginController();