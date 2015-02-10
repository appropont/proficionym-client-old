define(['angular', 'proficionym/ProficionymController'], function (angular, ProficionymController) {
	"use strict";

	var proficionym = angular.module('proficionym', ['ngRoute', 'status']);

	proficionym.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'modules/proficionym/proficionym.html',
			controller: ProficionymController
		});

	}]);

	return proficionym;
});