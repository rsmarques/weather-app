'use strict';

/**
 * @ngdoc overview
 * @name weatherApp
 * @description
 * # weatherApp
 *
 * Main module of the application.
 */
angular
    .module('weatherApp', [
        // services
        'weatherApp.services',
        // angular
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        // 'ngTouch',
        'ngMaterial',
        'ngGeolocation'
    ])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/weather.html',
                controller: 'WeatherCtrl',
                controllerAs: 'weather'
            })
            .otherwise({
                redirectTo: '/'
            });
    })

    .config(function($mdIconProvider) {
        $mdIconProvider.fontSet('md', 'material-icons');
    });
