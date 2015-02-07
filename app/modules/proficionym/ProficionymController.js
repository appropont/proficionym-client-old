define(function () {
	"use strict";

	var ProficionymController = function($scope, synonyms) {

		$scope.search = function(searchTerm) {

			//validate search term

			//get synonyms
			synonyms.getSynonyms(searchTerm)
				.then(function(data) {
					console.log('synonyms result: ', data);
				}, function(error) {
					console.log('synonyms error: ', error);
				});

		};



	};

	ProficionymController.$inject = ["$scope", "synonyms"];

	return ProficionymController;
});