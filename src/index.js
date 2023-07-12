const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');
const app = express();
const port = 3000;

const flash = require('express-flash');
const session = require('express-session');

app.use(session({
    secret: 'mynodejsblogabc123@@@',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 5 }
}));

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
        extname: '.hbs'
    }))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

