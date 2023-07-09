const siteRouter = require('./site');
const meRouter = require('./me');
const blogsRouter = require('./blogs');

function route(app) {
    app.use('/blogs', blogsRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;