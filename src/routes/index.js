const siteRouter = require('./site');
const meRouter = require('./me');
const router = require('./me');

function route(app) {
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;