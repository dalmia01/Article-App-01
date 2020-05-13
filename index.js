const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const port = process.env.PORT || 3000;
const {mongoKey} = require('./keys');

// Initialize App
const app = express();

// Connect to Mongodb Databse
mongoose.connect(mongoKey).then(res=>{
  console.log('Database - Mongodb Connected');
}).catch(err=>{
  console.log('Error Database - Mongodb Not connected',err);
});

// Bring in Article model
let Articles = require('./models/article');

// bodyparser middleware
// parse application /x-www-form urlencoded
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname,'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Bring in pug templating engine view
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// Authentication using passport config file
require('./config/passport')(passport);
// Passport js middleware
app.use(passport.initialize());
app.use(passport.session());

// Local User variable
app.get('*',(req,res,next)=>{
  res.locals.user = req.user || null;
  next();
});

// Bring other Routes in
let articles = require('./routes/articleroute');
let users = require('./routes/usersroute');
app.use('/article',articles);
app.use('/user/',users);


// Main local root  - Get Route
app.get('/',(req,res)=>{
  res.render('index',{
    title:'Node Express App'
  });
});

// Server started
app.listen(port,()=>{
  console.log(`@ port ${port} - server started`);
});
