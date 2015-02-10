define(["angular", "config/configuration"], function(angular, configuration) {
   "use strict";

    var standardAngularModules = [
    	"ngRoute", 
    	"about", 
    	"proficionym", 
        "services.api",
    	"contact", 
    	"navbar", 
    	"pascalprecht.translate", 
    	"config", 
    	"templates",
        "react"
    ];
        
    var config = angular.module('config', []);



    if (configuration.useMock) {
        standardAngularModules.push("ngMockE2E");
    }
    configuration.standardAngularModules = standardAngularModules;

    config.constant("config", configuration);

    return configuration;

});
