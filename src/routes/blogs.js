var express = require('express');
var router = express.Router();

const blogsController = require('../app/controllers/BlogController');

router.get('/create', blogsController.create);
router.get('/view-blog', blogsController.view);

module.exports = router;