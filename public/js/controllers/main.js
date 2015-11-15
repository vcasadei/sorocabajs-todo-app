angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		
		// Method to create the objects of new and completed to-do items
		var createObjects = function(data) {
			var done = [];
				var novo = [];
				var i = 0;
				for(i = 0; i < data.length; i++) {
					if (data[i].done == true) {
						done.push(data[i]);
					} else {
						novo.push(data[i]);
					}
				}
				return {
					novo: novo,
					done: done,
				};
		};
		
		// Gets all todos
		Todos.get()
			.success(function(data) {
				$scope.loading = false;
				var obj = createObjects(data);
				$scope.done = obj.done;
				$scope.novo = obj.novo;
				$scope.todos = data;
			});

		// Creates a todo
		$scope.createTodo = function() {

			// If the form is empty dows nothing
			if ($scope.formData.text !== undefined) {
				$scope.loading = true;

				// call to the service
				Todos.create($scope.formData)
					// In the case of success
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
						var obj = createObjects(data);
						$scope.done = obj.done;
						$scope.novo = obj.novo;
						$scope.todos = data;
					});
			}
		};

		// Deletes a todo
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// In the case of success
				.success(function(data) {
					$scope.loading = false;
					var obj = createObjects(data);
					$scope.done = obj.done;
					$scope.novo = obj.novo;
					$scope.todos = data;
				});
		};

		// Checks a todo
		$scope.checkTodo = function(id) {
			$scope.loading = true;
			// Calls the service
			Todos.put(id)
				// In the case of success
				.success(function(data) {
					$scope.loading = false;
					var obj = createObjects(data);
					$scope.done = obj.done;
					$scope.novo = obj.novo;
					$scope.todos = data;
				});
		};
	}]);
