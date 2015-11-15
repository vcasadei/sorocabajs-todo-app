// Requires
var express  = require('express');
var mongoose = require('mongoose'); // Mongoose for mongodb
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var database = require('./config/database'); //Loads the database configuration

var app      = express(); // creation of app with express
var port  	 = process.env.PORT || 8080; // Sets the port

// Mongodb Connection
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public')); // Sets static location
app.use(morgan('dev')); // Logs every request on the console
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));

// Import routes
require('./app/routes.js')(app);

// Starting node app
app.listen(port);
console.log("App listening on port localhost:" + port); // Just a console log