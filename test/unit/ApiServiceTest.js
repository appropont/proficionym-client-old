define(function() {
	"use strict";
	describe("the API service", function () {
		var apiService;

		beforeEach(function () {
			//load contact module,    see http://docs.angularjs.org/api/angular.mock.inject
			module("services.api");

			//properly instantiate the service
			inject(["Api", function (_apiService) {
				apiService = _apiService;
			}]);

			console.log = jasmine.createSpy('console');
		});


		it("should log messages to console", function () {
			apiService.getSynonyms('test')
				.then(function(data) {
					expect(console.log).toHaveBeenCalled();
				}, function(error) {
					//nothing here i hope
					expect(console.log).toHaveBeenCalled();
				});
		});
	});

});
