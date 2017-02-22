(function () {
	'use strict';

	angular
		.module('myApp', [])
		.config(['$httpProvider', function ($httpProvider) {
			$httpProvider.interceptors.push(['$q', '$log', function ($q, $log) {
				return {
					Response: function success(response) {
						$log.info('Successful response: ' + response);
						return response;
					},
					responseError: function (response) {
						var status = response.status;
						$log.error('Response status: ' + status + '. ' + response);
						return $q.reject(response); //similar to throw response;
					}
				}
			}]);
		}]);
})();