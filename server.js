/* modules import */
var express = require('express');
var path = require('path');
var http = require('http');
var mongoose = require('mongoose');

var config = {
	db: 'mongodb://localhost:27017/my-crud-app'
}

/* express configuration */
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* routes */
var tasksRouter = require('./routes');

var router = express.Router();

router.get('/', (req, res) => {

	res.send('<h1>Hello World</h1>');
});

app.use('/', router);
app.use('/tasks', tasksRouter);

/* server configs */
var port = 5000;
app.set('port', port);

var server = http.createServer(app);

function listen() {

	server.listen(port);
	console.log('Express app started on port ' + port);	
}

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect(config.db, { keepAlive: 1, useNewUrlParser: true });
}

connect();