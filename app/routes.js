var Todo = require('./models/todo'); // Loads the database model

var getTodos = function (res){
	Todo.find(function(err, todos) {
		if (err) {
			res.send(err);
		}
		res.json(todos);
	});
};

module.exports = function(app) {
	// Gets all todos
	app.get('/api/', function(req, res) {
		getTodos(res);
	});

	// Create todo
	app.post('/api/', function(req, res) {
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}
			getTodos(res);
		});

	});

	// Checks a todo
	app.put('/api/:todo_id', function(req, res) {
		var id = { _id : req.params.todo_id }; // The id
		var value = { done: true }; // The value to be updated
		var options = { multi: false }; // Multiple registers

		Todo.update(id, value, options,
		 function(err, todo) {
			if (err) {
				res.send(err);
			}
			getTodos(res);
		});
	});

	// Deletes a todo
	app.delete('/api/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err) {
				res.send(err);
			}
			getTodos(res);
		});
	});

	// Root the application
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // Loads the index (Angular will handle the rest)
	});
};
