
var http = require('http');
var express = require('express');
var sio = require('socket.io');
var routes = require('./routes/index');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var settings = require('./settings');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var ejs = require('ejs');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine','html');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
  secret: settings.cookieSecret,
  cookie: { maxAge: 30 * 60 * 1000 },
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: './uploads/'}).array('image'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = sio.listen(server);
var names = [];
io.sockets.on('connection', function(socket){
  socket.on('login', function(name){
    if(names.indexOf(name) == -1){
      names.push(name);
      socket.broadcast.emit('login', name);
    }
    io.sockets.emit('usersList', names);
  });
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });
  socket.on('logout', function(name){
    for(var i = 0; i < names.length; i++){
      if(names[i] == name){
        names.splice(i, 1);
        break;
      }
    }
    io.sockets.emit('usersList', names);
  });
});
