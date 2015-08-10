
/**
 * Module dependencies.
 */
var express = require('express')
	,routes = require('./approutes')
	, http = require('http')
	, path = require('path');

var fs = require('fs'); 
var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'}); 
var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'}); 

var settings = require('./settings');
var MongoStore = require('connect-mongo')(express);
var partials = require('express-partials');
var flash = require('connect-flash');
var sessionStore = new MongoStore({
    db : settings.db,
	host : settings.host,
    port : settings.port,
	stringify: settings.stringify,
	collection: settings.collection,
	auto_reconnect: settings.auto_reconnect,
	w: settings.w
}, function() {
    console.log('connect mongodb success...');
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(partials());
app.use(flash());
app.use(express.favicon());
app.use(express.logger({stream: accessLogfile}));'dev'
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({
    secret : settings.cookie_secret,
    cookie : {
        maxAge : 60000 * 20	//20 minutes
    },
    store : sessionStore
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
/*
// 一个简单的logger
app.use(function(req, res, next, err){
	console.log('%s %s', req.method, req.url);
	var meta = '[' + new Date() + '] ' + req.url + '\n'; 
	errorLogfile.write(meta + err.stack + '\n');  
	next();
});
*/
// routes
routes(app);

app.listen = function(){
  var self = this;
  var server = http.createServer(self);
  return server.listen(self.get('port'), function(){
	  console.log('Express server listening on port ' + self.get('port'));
	});
};

/*
appServer.error(function (err, req, res, next) {
    var meta = '[' + new Date() + '] ' + req.url + '\n';
    errorLogfile.write(meta + err.stack + '\n');
    next();
});
*/
if (!module.parent) {
	app.listen();
	/*
	appServer.listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
	*/
} 

module.exports = app;
