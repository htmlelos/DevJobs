const mongooge = require('mongoose');
require('./config/db');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config({ path: 'variables.env' });

const app = express();

// habilitar handlebars como view
app.engine('handlebars', exphbs({ defaultLayout: 'layouts' }));
app.set('view engine', 'handlebars');

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE,
    }),
  })
);

app.use('/', router());

app.listen(process.env.PORT || 5000);
