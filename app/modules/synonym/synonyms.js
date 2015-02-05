define(['angular', 'apiKeys', 'services.jsonip'], function (angular, apiKeys) {
  'use strict';
  angular.module('services.synonyms', [])
    .factory('synonyms', function synonymsFactory($http, $q) {
		
    	var getSynonyms = function (word) {

    		var deferred = $q.defer();

    		var apiEndpoint = 'https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/',
    			keyString = '?key=' + apiKeys.thesaurus;

    		var url = apiEndpoint + word + keyString;

    		$http.get(url)
    			.success(function(data) {
    				//process response
    				deferred.resolve(data);
    			})
    			.error(function(e) {
    				deferred.reject(e);
    			});

    		return deferred.promise;
    	};

    	return {
    		getSynonyms : getSynonyms
    	};

    });
});