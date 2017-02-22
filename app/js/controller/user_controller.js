(function () {
	'use strict';

	angular
		.module('myApp')
		.controller('UserController', UserController);

	UserController.$inject = ['$scope', 'UserService'];

	function UserController($scope, UserService) {
		var vm = this;

		vm.user = { id: null, username: '', address: '', email: '' };
		vm.users = [];

		vm.submit = submit;
		vm.edit = edit;
		vm.remove = remove;
		vm.reset = reset;

		fetchAllUsers();

		function fetchAllUsers() {
			UserService.fetchAllUsers()
				.then(
				function (d) {
					vm.users = d;
				},
				function (errResponse) {
					console.error('Error while fetching Users');
				}
				);
		}

		function createUser(user) {
			UserService.createUser(user)
				.then(
				fetchAllUsers,
				function (errResponse) {
					console.error('Error while creating User');
				}
				);
		}

		function updateUser(user, id) {
			UserService.updateUser(user, id)
				.then(
				fetchAllUsers,
				function (errResponse) {
					console.error('Error while updating User');
				}
				);
		}

		function deleteUser(id) {
			UserService.deleteUser(id)
				.then(
				fetchAllUsers,
				function (errResponse) {
					console.error('Error while deleting User');
				}
				);
		}

		function submit() {
			if (vm.user.id === null) {
				console.log('Saving New User', vm.user);
				createUser(vm.user);
			} else {
				updateUser(vm.user, vm.user.id);
				console.log('User updated with id ', vm.user.id);
			}
			reset();
		}

		function edit(id) {
			console.log('id to be edited', id);
			for (var i = 0; i < vm.users.length; i++) {
				if (vm.users[i].id === id) {
					vm.user = angular.copy(vm.users[i]);
					break;
				}
			}
		}

		function remove(id) {
			console.log('id to be deleted', id);
			if (vm.user.id === id) {//clean form if the user to be deleted is shown there.
				reset();
			}
			deleteUser(id);
		}


		function reset() {
			vm.user = { id: null, username: '', address: '', email: '' };
			$scope.myForm.$setPristine(); //reset Form
		}

	}
})();