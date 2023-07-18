const User = require('../models/User');
const Blog = require('../models/Blog');
const { multipleMongooseToObject } = require('../../ulti/mongoose')

class SiteController {
    //[GET] /
    index(req, res, next) {
        const defaultAvatar = 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
        let data = {};
        const PAGE_SIZE = 3;
        if (req.session.username) {
            User.findOne({ username: req.session.username })
                .then(user => {
                    data.isLoginView = true;
                    data.username = req.session.username;
                    data.avatar = user && user.avatar ? user.avatar : defaultAvatar;
                    return Blog.find({}).populate('author');
                })
                .then(blogs => {
                    let page = parseInt(req.query.page) || 1;
                    const totalBlogs = blogs.length;
                    const pageCount = Math.ceil(totalBlogs / PAGE_SIZE);
                    const startIndex = (page - 1) * PAGE_SIZE;
                    const endIndex = Math.min(startIndex + PAGE_SIZE, totalBlogs);

                    data.blogs = multipleMongooseToObject(blogs.slice(startIndex, endIndex));
                    data.page = page;
                    data.pages = [];

                    for (let i = 1; i <= pageCount; i++) {
                        data.pages.push({
                            page: i,
                            active: i === page
                        });
                    }
                    data.pageCount = pageCount;
                    res.render('home', data);
                })
                .catch(next);
        } else {
            Blog.find({}).populate('author')
                .then(blogs => {
                    data.isLoginView = false;
                    let page = parseInt(req.query.page) || 1;
                    const totalBlogs = blogs.length;
                    const pageCount = Math.ceil(totalBlogs / PAGE_SIZE);
                    const startIndex = (page - 1) * PAGE_SIZE;
                    const endIndex = Math.min(startIndex + PAGE_SIZE, totalBlogs);
                    data.blogs = multipleMongooseToObject(blogs.slice(startIndex, endIndex));
                    data.page = page;
                    data.pages = [];

                    for (let i = 1; i <= pageCount; i++) {
                        data.pages.push({
                            page: i,
                            active: i === page
                        });
                    }
                    data.pageCount = pageCount;
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
