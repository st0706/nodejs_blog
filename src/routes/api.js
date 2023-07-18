// File: routes/api.js
const express = require('express');
const router = express.Router();
const Blog = require('../app/models/Blog');

router.get('/blogs', (req, res, next) => {
    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * PAGE_SIZE;

    Blog.find({})
        .skip(startIndex)
        .limit(PAGE_SIZE)
        .populate('author')
        .exec()
        .then(blogs => {
            res.json(blogs);
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;
