define(['angular'], function (angular) {
	"use strict";

	angular.module("services.api", ["$http"])
		.factory("Api", function ($http) {
	    	
			var queryApi = function(word, options) {

				var endpoint = 'http://deb7local.com:3000/query/';

				var url = endpoint + word;

				if(options && options.tld) {
					url += '?' + options.tld;
					if(options.prefix) url += '&prefix=' + options.prefix;
					if(options.suffix) url += '&prefix=' + options.suffix;
				}

				return $http.get(url)
			}

	    	return {
	    		queryApi : queryApi
	    	}
	    });

});