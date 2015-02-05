define(['angular'], function (angular) {
    'use strict';

    angular.module('services.jsonip', [])
        .factory('jsonip', function synonymsFactory($http, $q) {
    		
            var cachedIP = null;

        	var getIP = function () {

        		var deferred = $q.defer();

                if(!!cachedIP) {
                    deferred.resolve(cachedIP);
                } else {
            		$http.get('http://jsonip.com')
            			.success(function(data) {
            				//process response
                            cachedIP = data.ip;
            				deferred.resolve(cachedIP);
            			})
            			.error(function(e) {
            				deferred.reject(e);
            			});
                }

        		return deferred.promise;
        	};

            return {
                getIP : getIP
            };

        });
        
});