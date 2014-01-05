
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config = require('./config');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');

var app = exports.app = express();


// set the dbUrl to the mongodb url that corrosponds to the environment we are in
app.set('dbUrl', config.db[app.settings.env]);
mongoose.connect(app.get('dbUrl'));



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(expressValidator);

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/signup', users.signup);

app.get('/add/:first/:second', function (req, res) {
  // convert the two values to floats and add them together
  var sum = parseFloat(req.params.first) + parseFloat(req.params.second);
  res.send(200, String(sum));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
