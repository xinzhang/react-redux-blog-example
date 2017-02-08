var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var jwt = require('jsonwebtoken');

//routes
//var users = require('./routes/users');
var posts = require('./routes/posts');

var app = express();
var port = process.env.PORT || 5100;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var staticPath = 'Public';
//app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/api/', posts);
//app.use('/api/', users);

//get the users
//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.

// app.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.headers['authorization'];
//   if (!token) return next();
//
//   token = token.replace('Bearer ', '');
//
//   jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
//     if (err) {
//       return res.status(401).json({
//         success: false,
//         message: 'Please register Log in using a valid email to submit posts'
//       });
//     } else {
//       req.user = user;
//       next();
//     }
//   });
//
// });


//MongoDB
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/blogs');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected!');
});

app.listen(port);
console.log('start to listening ' + port);

module.exports = app;
