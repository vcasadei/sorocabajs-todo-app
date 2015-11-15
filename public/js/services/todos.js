angular.module('todoService', [])

	// Simple http service
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/');
			},
			create : function(todoData) {
				return $http.post('/api/', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/' + id);
			},
			put : function(id) {
				return $http.put('/api/' + id);
			}
		}
	}]);
