define(function () {
	"use strict";

	var ProficionymController = function($scope, Api) {

		$scope.search = function(searchTerm) {
			console.log('search clicked');
			Api.queryApi(searchTerm)
				.then(function(result) {
					console.log('success: ', result);
				})
				.catch(function(error) {
					console.log('error: ', error)
				});

		};



	};

	ProficionymController.$inject = ["$scope", "services.api"];

	return ProficionymController;
});