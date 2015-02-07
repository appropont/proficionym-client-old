define(function() {
	"use strict";
	describe("the synonymsService", function () {
		var synonymsService;

		beforeEach(function () {
			//load contact module,    see http://docs.angularjs.org/api/angular.mock.inject
			module("services.synonyms");

			//properly instantiate the service
			inject(["synonyms", function (_synonymsService) {
				synonymsService = _synonymsService;
			}]);

			console.log = jasmine.createSpy('console');
		});


		it("should log messages to console", function () {
			synonymsService.getSynonyms('test')
				.then(function(data) {
					expect(console.log).toHaveBeenCalled();
				}, function(error) {
					//nothing here i hope
					expect(console.log).toHaveBeenCalled();
				});
		});
	});

});
