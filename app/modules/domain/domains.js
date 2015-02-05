define(['angular', 'apiKeys', 'services.jsonip'], function (angular, apiKeys, jsonip) {
    'use strict';
    angular.module('services.domains', [])
	    .config(function ($httpProvider) {
	     	$httpProvider.interceptors.push('xmlHttpInterceptor');
	    })
    	.factory('domains', function synonymsFactory($http, $q) {
		
    		var _buildDomainString = function(words, tld) {

    			var domainString = '',
    				lastIndex = words.length - 1;

    			for(var i = 0; i <= lastIndex; i++) {
    				var domain = words[i] + '.' + tld;
    				domainString += domain;
    				if(i !== lastIndex) {
    					domainString += ',';
    				}
    			}

    			return domainString;
    		};

	    	var getAvailableDomains = function(words, tld) {

	    		var deferred = $q.defer();

	    		jsonip.getIP()
	    			//deal with response of getIP
	    			.then(function(data) {
	    				console.log('checkDomains getIP response data: ', data);

	    				var ip = data.ip;
	    				var domainString = _buildDomainString(words, tld);
	    				
	    				var url = 'https://api.namecheap.com/xml.response?' + 
	    					'ApiUser=' + apiKeys.namecheap.apiUser +
	    					'&ApiKey=' + apiKeys.namecheap.apiKey +
	    					'&UserName=' + apiKeys.namecheap.userName + 
	    					'&Command=namecheap.domains.check' +
	    					'&ClientIP=' + ip +
	    					'&DomainList=' + domainString;

	    				return $http.get(url);

	    			}, function(error) {
	    				console.log('checkDomains getIP response error: ', error);
	    				deferred.reject(error);
	    			})
	    			//deal with response of $http.get of domains and their availability
	    			.then(function(data) {
	    				console.log('checkDomains response data: ', data);

	    				//need to filter list for available domains
	    				var availableDomains = [];

	    				deferred.resolve(availableDomains);
	    			}, function(error) {
	    				console.log('checkDomains response error:', e);
	    				deferred.reject(error);
	    			});

	    		return deferred.promise;
	    	};

	    	return {
	    		getAvailableDomains : getAvailableDomains
	    	};

    });
});