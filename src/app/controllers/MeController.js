class MeController {
    //[GET] /me
    index(req, res, next) {
        res.render('me/storedblog')
    }
}

module.exports = new MeController();