const express = require('express')
const app = express()
var path    = require("path");
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var expressValidator = require('express-validator');
//var dbConfig = require('./config/db.js');
//var mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');


// Setup view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug')

// Connect to db
//mongoose.connect(dbConfig.url);
var mongoose = require('./db/mongoose.js');

// Setup static files
app.use("/public",express.static(path.join(__dirname, '/public')));


// Setup express-sessions
app.use(expressSession({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true
}));

// Setup parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


// Setup passport
require('./config/passport.js')(passport);
app.use(passport.initialize());
app.use(passport.session());


// Set up express-messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// Set up express-validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Middleware

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.user = req.user;
  next();
});


// Setup routers
var schedulesRouter = require('./routes/schedules.js')(passport);
var loginRouter = require('./routes/login.js')(passport);
var eventsRouter = require('./routes/events.js')(passport);

app.use('/login',loginRouter);
app.use('/schedules',schedulesRouter);
app.use('/events',eventsRouter);
app.get('/',function(req,res){
  res.redirect('/schedules');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Listening on port 3000!')
})
