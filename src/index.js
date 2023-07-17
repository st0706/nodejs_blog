const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');
const app = express();
const port = 3000;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('./app/models/User');
const moment = require('moment');
const flash = require('express-flash');
const session = require('express-session');
moment.locale('vi');
app.use(passport.initialize());
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(session({
    secret: 'mynodejsblogabc123@@@',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 5 }
}));
app.use(passport.session());
passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: '281476790923-18hgc04fubt5uggbt6f77aq7v16e6rp8.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: '/auth/google/redirect',
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ email: profile.emails[0].value })
                .then((user) => {
                    if (!user) {
                        const newUser = new User({
                            username: profile.emails[0].value,
                            email: profile.emails[0].value,
                            avatar: profile.photos[0].value,
                        });

                        newUser.save()
                            .then(() => done(null, profile))
                            .catch((err) => done(err));
                    } else {
                        user.email = profile.emails[0].value;
                        user.save()
                            .then(() => done(null, profile))
                            .catch((err) => done(err));
                    }
                })
                .catch((err) => done(err));
        }
    )
);
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
    '/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Lưu thông tin người dùng vào session
        User.findOne({ email: req.user.emails[0].value })
            .then(user => {
                req.session.username = user.username;
                res.redirect('/');
            })
    }
);




app.use(flash());

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('combined'));

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

//Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs',
        helpers: {
            moment: function (date, format) {
                return moment(date).format(format);
            }
        }
    }))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

