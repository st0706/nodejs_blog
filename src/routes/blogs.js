var express = require('express');
var router = express.Router();

const blogsController = require('../app/controllers/BlogController');

router.get('/create', blogsController.create);
router.post('/write-comment', blogsController.write);
router.get('/:slug', blogsController.show);

module.exports = router;