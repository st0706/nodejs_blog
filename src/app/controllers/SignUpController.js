const User = require('../models/User');

class SignUpController {
    //[GET] /authen/signup
    signup(req, res, next) {
        res.render('authen/signup', { flash: req.flash() });
    }

    //[POST] /authen/users/store
    store(req, res, next) {
        User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        })
            .then(existingUser => {
                if (existingUser) {
                    if (existingUser.username === req.body.username) {
                        req.flash('error', 'Tên người dùng đã tồn tại');
                    } else {
                        req.flash('error', 'Email đã tồn tại');
                    }
                    res.redirect('/authen/signup');
                } else {
                    const user = new User(req.body);
                    user.avatar = 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                    return user.save()
                        .then(() => {
                            req.flash('success', 'Tạo tài khoản thành công');
                            res.redirect('/authen/login');
                        });
                }
            })
            .catch(next);
    }

}

module.exports = new SignUpController();