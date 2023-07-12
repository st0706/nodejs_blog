const User = require('../models/User');

class LoginController {
    //[GET] /authen/login
    login(req, res, next) {
        res.render('authen/login', { flash: req.flash() });
    }
    //[POST] /authen/users/login
    signIn(req, res, next) {
        var username = req.body.username
        var password = req.body.password

        User.findOne({
            username: username,
            password: password
        })
            .then(data => {
                if (data) {
                    req.session.username = data.username
                    res.redirect('/');
                }
                else {
                    req.flash('error', 'Tài khoản không đúng');
                    res.redirect('/authen/login');
                }
            })
            .catch(next)
    }
}

module.exports = new LoginController();