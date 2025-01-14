// setup =================================================
// tools
var express = require('express');
var http = require('http');
var app = express();
var aws = require('aws-sdk');
// var test = aws.config.loadFromPath('./AwsConfig.json');
// var test2 = aws.config.credentials = test
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');

var multer = require('multer');




// configuration =========================================
var mongoURI = process.env.mongoURI || 'mongodb://szeyeungng:Password123!@ds029197.mongolab.com:29197/marinate';
//var mongoURI = process.env.mongoURI;
mongoose.connect(mongoURI);


require('./config/passport')(passport); // pass passport for configuration

// setup our express app
app.use(morgan('dev')); // log every request to console
app.use(cookieParser()); //read cookies
app.use(bodyParser()); //get information from html forms

app.engine('.html',require('ejs').__express);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine','html');

// required for passport
app.use(session({secret:'ilovescotchscotchyscotchscotch'})); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash()); //use connect-flash for flash messages stored in session

app.use(multer({dest:'./uploads/'}));

// routes =================================================
require('./app/routes.js')(app,passport,aws); //load our routes and pass in our app and fully configured passport

app.listen(port);
/*var io = require('socket.io').listen(app.listen(port));*/
console.log('server has started');

/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});*/