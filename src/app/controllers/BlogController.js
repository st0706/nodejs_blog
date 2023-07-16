const User = require('../models/User');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const { mongooseToObject } = require('../../ulti/mongoose')
const { multipleMongooseToObject } = require('../../ulti/mongoose')
const defaultAvatar = 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'

class BlogController {
    //[GET] /blogs/:slug
    show(req, res, next) {
        let data = {};
        if (req.session.username) {
            User.findOne({ username: req.session.username })
                .then(user => {
                    data.isLoginView = true;
                    data.username = req.session.username;
                    data.avatar = user && user.avatar ? user.avatar : defaultAvatar;
                    return Blog.findOne({ slug: req.params.slug }).populate('author')
                })
                .then(blog => {
                    data.blog = mongooseToObject(blog)
                    return Comment.find({ blog: data.blog._id }).populate('user')
                })
                .then(comments => {
                    data.comments = multipleMongooseToObject(comments)
                    res.render('blogs/view-blog', data)
                })
                .catch(next)
        }
        else {
            let data = {};
            Blog.findOne({ slug: req.params.slug }).populate('author')
                .then(blog => {
                    data.blog = mongooseToObject(blog)
                    data.isLoginView = false;

                    res.render('blogs/view-blog', data)
                })
                .catch(next)
        }
    }

    //[GET] /blogs/create
    create(req, res, next) {
        let data = {};
        if (req.session.username) {
            User.findOne({ username: req.session.username })
                .then(user => {
                    data.isLoginView = true;
                    data.username = req.session.username;
                    data.avatar = user && user.avatar ? user.avatar : defaultAvatar;
                    res.render('blogs/create-blog', data)
                })
                .catch(next)
        }
        else {
            res.render('blogs/view-blog', { isLoginView: false })
        }
    }

    write(req, res, next) {
        let isLoginView = false;
        let usernameID;
        let avatar;
        const blogSlug = req.body.blogSlug;
        if (req.session.username) {
            User.findOne({ username: req.session.username })
                .then(user => {
                    isLoginView = true;
                    usernameID = user._id;
                    avatar = user && user.avatar ? user.avatar : defaultAvatar;
                    return Blog.findOne({ slug: blogSlug });
                })
                .then(blog => {
                    blog = mongooseToObject(blog);
                    const newComment = new Comment({
                        blog: blog._id,
                        user: usernameID,
                        content: req.body.comment
                    });
                    return newComment.save();
                })
                .then(() => {
                    res.redirect(`/blogs/${blogSlug}`);
                })
                .catch(next);
        }
        else {
            res.json("chua dang nhap")
        }
    }
}

module.exports = new BlogController();


