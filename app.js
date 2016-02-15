var express = require('express')
  , path    = require('path')
  , http    = require('http')
  , config  = require('./config/config');

var app = express();
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'public')));
});

require('./config/routes')(app, config);

var server;
server = http.createServer(app).listen(config.port, function(){
  console.log("Express server listening on port " + server.address().port);
});

http.globalAgent.keepAlive = true;

module.exports = {
    app: app,
    server: server,
    config: config
};
