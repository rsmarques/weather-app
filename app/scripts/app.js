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
        // controllers
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

    .constant('WEATHER_API_URL', 'http://api.openweathermap.org/data/2.5/')

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
