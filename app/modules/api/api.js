define(['angular', 'async'], function (angular, async) {
	"use strict";

	angular.module("services.api", [])
		.factory("Api", ['$http', '$q', function ($http, $q) {

			var apiRoot = "deb7local.com:3000";

			var getSynonyms = function(word, options) {
				var deferred = $q.defer();

				var endpoint = 'http://' + apiRoot + '/synonyms/';

				var url = endpoint + word;

				if(options) {
					url += '?' + options.tld;
					if(options.prefix) { url += '&prefix=' + options.prefix; }
					if(options.suffix) { url += '&suffix=' + options.suffix; }
				}

				$http.get(url)
					.success(function(result) {
						console.log('result', result);
						deferred.resolve(result);
					})
					.error(function(error) {
						console.log('error: ', error);
						deferred.reject(error);
					});

				return deferred.promise;
			};




			var batchWhois = function(domains, tick) {
				var deferred = $q.defer();

				var	maxActiveLookups = 6,
					domainResults = {
						available : [],
						registered : [],
						error : []
					};


				var lookup = function(domain, callback) {
					whoisLookup(domain)
						.then(function(result) {
							//console.log('batchWhois: whoisLookup: result');
							//console.log(result);
							result.key = domain;
							domainResults[result.status].push(result);
							callback();
						})
						.catch(function(error) {
							//console.log('batchWhois: whoisLookup: error');
							console.log(error);
							callback();
						});
				};

				var queue = async.queue(lookup, maxActiveLookups);

				queue.drain = function() {
					console.log("All domains are checked.");
					console.log("Domains Checked: ", domainResults.length);
				    deferred.resolve(domainResults);
				};

				queue.push(domains, tick);

				return deferred.promise;
			};

			//individual lookup
			var whoisLookup = function(domain) {
				var deferred = $q.defer();

				var endpoint = 'http://' + apiRoot + '/whois/';

				var url = endpoint + domain;

				$http.get(url)
					.success(function(result) {
						//console.log('whois result', result);
						deferred.resolve(result);
					})
					.error(function(error) {
						//console.log('whois error: ', error);
						deferred.reject(error);
					});

				return deferred.promise;
			};



	    	return {
	    		//queryApi : queryApi,
	    		getSynonyms : getSynonyms,
	    		whoisLookup : whoisLookup,
	    		batchWhois : batchWhois
	    	};
	    }]);

});