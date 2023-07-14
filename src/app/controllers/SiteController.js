const User = require('../models/User');
const Blog = require('../models/Blog');
const { multipleMongooseToObject } = require('../../ulti/mongoose')

class SiteController {
    //[GET] /
    index(req, res, next) {
        const defaultAvatar = 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
        let data = {};
        if (req.session.username) {
            User.findOne({ username: req.session.username })
                .then(user => {
                    data.isLoginView = true;
                    data.username = req.session.username;
                    data.avatar = user && user.avatar ? user.avatar : defaultAvatar;
                    return Blog.find({}).populate('author');
                })
                .then(blogs => {
                    data.blogs = multipleMongooseToObject(blogs)
                    res.render('home', data)
                })
                .catch(next);
        } else {
            Blog.find({}).populate('author')
                .then(blogs => {
                    data.isLoginView = false;
                    data.blogs = multipleMongooseToObject(blogs);
                    res.render('home', data);
                })
                .catch(next)
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
