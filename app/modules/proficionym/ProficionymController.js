define(function () {
	"use strict";

	var createDomains = function(synonyms, options) {
		var domains = [];
		for(var i = 0; i < synonyms.length; i++) {
			var domain = options.prefix + synonyms[i] + options.suffix + '.' + options.tld;
			domains.push(domain);
		}
		return domains;
	};

	var ProficionymController = function($scope, Api) {

		$scope.showIntro = true;

		$scope.toggleShowIntro = function() {
			$scope.showIntro = !$scope.showIntro;
		};

		$scope.tlds = [
			{label: '.com', tld: 'com'},
			{label: '.net', tld: 'net'},
			{label: '.org', tld: 'org'},
			{label: '.io' , tld: 'io' }
		];
		$scope.tld = $scope.tlds[0];

		$scope.person = {fname: 'Chris', lname: 'Griffing', count: 0};

		$scope.search = function(searchTerm, prefix, suffix, tld) {
			console.log('search clicked');

			$scope.showIntro = false;

			var options = {
				tld : 'com',
				prefix : '',
				suffix : ''
			};
			if(tld && tld !== '') {options.tld = tld;}
			if(prefix && prefix !== '') {options.prefix = prefix;}
			if(suffix && suffix !== '') {options.suffix = suffix;}

			var processedCount = 0;

			Api.getSynonyms(searchTerm)
				.then(function(result) {
					//console.log('success: ', result);
					var domains = createDomains(result, options);

					return Api.batchWhois(domains, function() {
						processedCount++;
						$scope.person.count++;
						console.log('processed: ', processedCount);
					});
				})
				.then(function(results) {
					console.log('batchWhois results');
					console.log(results);
				})
				.catch(function(error) {
					console.log('error: ', error);
				});
		};

	};

	ProficionymController.$inject = ["$scope", "Api"];

	return ProficionymController;
});