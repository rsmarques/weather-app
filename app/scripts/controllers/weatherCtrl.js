'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:WeatherCtrl
 * @description
 * # WeatherCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')

    .controller('WeatherCtrl', function ($scope, Weather) {

        $scope.getCurrentForecast   = function ()
        {
            Weather.getForecastByString({appid: '2911ba8cd195c0f95bd59a86e338c71e', units: 'metric', q: 'Lisbon'}, function (result) {

                // decoding response
                $scope.locationStr      = result.city.name + ', ' + result.city.country;
                $scope.forecast         = [];
                $scope.forecastIndex    = 0;

                // parsing each forecast
                angular.forEach(result.list, function (forecast) {

                    // parsing temperatures to int
                    Object.keys(forecast.temp).map(function (key) {
                       forecast['temp'][key] =  parseInt(forecast['temp'][key]);
                    });

                    // adding date to forecast
                    forecast.weekDay    = moment.unix(forecast.dt).format('dddd');
                    forecast.dateStr    = moment.unix(forecast.dt).format('dddd, Do MMMM');

                    forecast.icon       = 'images/icons_weather/' + forecast.weather[0].icon + '.svg';

                    // uppercase weather description
                    forecast.weather[0].description = forecast.weather[0].description.replace(/\b[a-z]/g, function (f) { return f.toUpperCase(); });

                    $scope.forecast.push(forecast);
                });


            }, function (err) {
                // TODO error treatment
                console.log("Error getting weather!")
                console.log(err);
            });
        }

        $scope.getCurrentForecast();
    });
