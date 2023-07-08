const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const route = require('./routes');
const app = express();
const port = 3000;

app.use(morgan('combined'));

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

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

