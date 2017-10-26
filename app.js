var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var contacts = require('./routes/contacts');
var groups = require('./routes/groups');
//var contacts = require('./contacts/contacts-manage');
//var url = require ('url');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/contacts', contacts);
app.use('/groups', groups);
//app.use('/contacts/:number', contacts);
/*
app.get('/contacts', function (request, response){

    var get_params = url.parse(request.url, true).query;
    if(Object.keys(get_params).length == 0){
        response.setHeader('Content-type', 'application/json');
        response.end(JSON.stringify(contacts.lists()));
    }else{
        response.setHeader('content-type', 'application/json');
        response.end(JSON.stringify(contacts.query_by_arg(get_params.args, get_params.value)));
    }
});

app.get('/contacts/:number', function(request, response){
    response.setHeader('content-type', 'application/json');
    response.send(JSON.stringify(contacts.query(request.param.number)));
});
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
