var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var https = require('https');
var hmacsha1 = require('hmacsha1');
var cryptojs = require('crypto-js');
var models  = require('./models');

var jsonRender = require('./routes/json_render');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/*', function(req, res, next) {
		
	if ( cryptojs.enc.Hex.stringify(cryptojs.HmacSHA1(req.body.query, require("./crypto").encrypt(require("./crypto").decrypt(req.body.public_key, ""), ""))) == req.body.query_hash ) {
		
		 models.access.findOne( { where: { group_id : require("./crypto").decrypt(req.body.public_key, "") } } ).then(function (foundItem) {
		        
			 if ( !foundItem ) {
		            
				models.access.create({ group_id : require("./crypto").decrypt(req.body.public_key, "") });
		     
			 } else {
		           
	            models.access.update( { group_id : require("./crypto").decrypt(req.body.public_key, "") }, 
	            	          { where: { group_id :  require("./crypto").decrypt(req.body.public_key, "") }
	            });
		            
		     }
			 
		});
		 
		console.log(req.body);
		next();
		
	} else {
		
		res.render('json_render', { data: "[{'Error': 'Authentication failed.'}]" });
		
	}
	
});

app.use('/4CCS1PPA', jsonRender);
app.use('/', jsonRender);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//app.listen(8080);

module.exports = app;
