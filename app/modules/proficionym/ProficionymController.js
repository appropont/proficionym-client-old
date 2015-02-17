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

	var defaultStatus = function() {
		return {
			status : 'Idle',
			processedCount : 0,
			totalCount : 0,
			availableCount : 0,
			registeredCount : 0,
			errorCount : 0
		};
	};

	var ProficionymController = function($scope, Api) {

		$scope.showIntro = true;

		$scope.hasSearched = false;

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

		$scope.domains = {
			available : [],
			registered : [],
			error : []
		};
		$scope.temp = {temp: 'Temporary', key: 'temp'};
		$scope.status = defaultStatus();

		$scope.search = function(searchTerm, prefix, suffix, tld) {
			console.log('search clicked');

			$scope.showIntro = false;
			var resetStatus = defaultStatus();
			resetStatus.status = 'Processing';
			$scope.status = resetStatus;

			var options = {
				tld : 'com',
				prefix : '',
				suffix : ''
			};
			if(tld && tld !== '') {options.tld = tld;}
			if(prefix && prefix !== '') {options.prefix = prefix;}
			if(suffix && suffix !== '') {options.suffix = suffix;}

			Api.getSynonyms(searchTerm)
				.then(function(result) {
					//console.log('success: ', result);
					var domains = createDomains(result.synonyms, options);
					$scope.status.totalCount = domains.length;

					return Api.batchWhois(domains, function() {
						$scope.status.processedCount++;
					});
				})
				.then(function(results) {
					//console.log('batchWhois results');
					//console.log(results);
					$scope.status.availableCount = results.available.length;
					$scope.status.registeredCount = results.registered.length;
					$scope.status.errorCount = results.error.length;
					$scope.domains = results;
					$scope.hasSearched = true;
				})
				.catch(function(error) {
					console.log('error: ', error);
					alert(error.description);
					resetStatus.status = "Error!"; 
					$scope.status = resetStatus;
				})
				.finally(function() {
					$scope.status.status = 'Idle';
				});
		};

	};

	ProficionymController.$inject = ["$scope", "Api"];

	return ProficionymController;
});