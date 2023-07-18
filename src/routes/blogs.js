var express = require('express');
var router = express.Router();

const blogsController = require('../app/controllers/BlogController');

router.get('/create', blogsController.create);
router.post('/stored', blogsController.stored);
router.post('/write-comment', blogsController.write);
router.post('/:id', blogsController.destroy);
router.get('/:slug', blogsController.show);

module.exports = router;