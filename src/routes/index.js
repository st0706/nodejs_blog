const siteRouter = require('./site');
const meRouter = require('./me');
const blogsRouter = require('./blogs');
const authenRouter = require('./authen');

function route(app) {
    app.use('/blogs', blogsRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
    app.use('/authen', authenRouter);
}

module.exports = route;