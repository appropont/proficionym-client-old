define(function() {
	"use strict";
	describe("The API service", function () {

		//overwriting default temporarily
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

		var apiService;

		beforeEach(function (done) {
			//load api module,    see http://docs.angularjs.org/api/angular.mock.inject
			module("services.api");

			//properly instantiate the service
			angular.mock.inject(["Api", function (_apiService) {
				apiService = _apiService;
			}]);

			console.log('apiService: ', apiService);

			done();

			//console.log = jasmine.createSpy('console');
		});

		it("should test basic values", function (done) {
			console.log('test2')
			var val = true;
			expect(val).toBe(true);
			done();
		});

		it("should result in error when given non-existent word", function (done) {
			console.log('testing');
			/*apiService.getSynonyms('test')
				.then(function(result) {
					console.log('then');
					expect(result).not.toBeUndefined();
					expect(result.error).not.toBeUndefined();
					done();
				})
				.catch(function(error) {
					console.log('catch');
					expect(error).toBeUndefined();
					done();
				})
				.finally(function() {
					console.log('finally');
					expect(val).toBe(true);
					done();
				});*/
			apiService.getSynonyms('testtest')
				.then(function(result) {
					expect(result).not.toBeUndefined();
					expect(result.error).not.toBeUndefined();
					done();
				}, function(error) {
					expect(error).toBeUndefined();
					done();
				});
		});

	});

});
