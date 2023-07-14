const User = require('../models/User');
const { mongooseToObject } = require('../../ulti/mongoose')

class SiteController {
    //[GET] /
    index(req, res, next) {
        if (req.session.username) {
            User.findOne({ username: req.session.username })
                .then(user => {
                    res.render('home', { isLoginView: true, username: req.session.username, avatar: user ? user.avatar : null });
                })
                .catch(err => {
                    console.log(err);
                    res.render('home', { isLoginView: true, username: req.session.username, avatar: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' });
                });
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
