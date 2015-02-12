define([
		'angular',
		'config/config', 
		'angular-route',
		'react',
		'ngReact',
		'proficionym/proficionym', 
		'templates', 
		'api/api',
		'status/status',
		'results/results'
	],
	function (angular, config) {
	"use strict";

    var app = angular.module('app', config.standardAngularModules);

	app.config(['$httpProvider', '$routeProvider', '$translateProvider', function ($httpProvider, $routeProvider, $translateProvider) {
		$translateProvider.useStaticFilesLoader({
			prefix: 'translations/',
			suffix: '.json'
		});
		$translateProvider.determinePreferredLanguage();
		$translateProvider.useMissingTranslationHandlerLog();

		$routeProvider.otherwise({redirectTo: '/'});
	}]);

	return app;
});
