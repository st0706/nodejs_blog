class SignUpController {
    //[GET] /authen/signup
    signup(req, res, next) {
        res.render('authen/signup')
    }
}

module.exports = new SignUpController();