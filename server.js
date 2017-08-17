const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const routes = require('./routes/index');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'mustache');
app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.us(expressValidator());

app.use(session({
  secret: "Keep it secret; keep it safe",
  resave: false,
  saveUninitialized: false
}));

app.use(routes);

app.use(morgan('dev'));

app.listen(3000, function(){
  console.log("Mobbinbobbin' on localhost:3000");
})
