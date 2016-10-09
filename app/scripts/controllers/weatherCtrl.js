'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:WeatherCtrl
 * @description
 * # WeatherCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')

    .controller('WeatherCtrl', function ($scope, $mdDialog, $mdToast, Weather) {

        $scope.showLocationPrompt = function (ev)
        {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('What\'s your location?')
                .placeholder('London, UK')
                .ariaLabel('Location')
                .targetEvent(ev)
                .ok('Done')

            $mdDialog.show(confirm).then(function (result) {
                $scope.currentLocation  = result;
                $scope.getCurrentForecast();
            });
        };

        $scope.increaseForecastIndex    = function () {
            if ($scope.forecastIndex < $scope.forecast.length - 1) {
                $scope.forecastIndex++;
            }

            return true;
        };

        $scope.decreaseForecastIndex    = function () {
            if ($scope.forecastIndex > 0) {
                $scope.forecastIndex--;
            }

            return true;
        };

        $scope.setForecastIndex     = function (index) {

            $scope.forecastIndex    = index;
            return true;
        };

        $scope.getCurrentForecast   = function ()
        {
            Weather.getForecastByString({appid: '2911ba8cd195c0f95bd59a86e338c71e', units: 'metric', q: $scope.currentLocation, cnt : 5}, function (result) {

                // decoding response
                $scope.locationStr      = result.city.name + ', ' + result.city.country;
                $scope.forecast         = [];
                $scope.forecastIndex    = 0;

                // parsing each forecast
                angular.forEach(result.list, function (forecast, index) {

                    // parsing temperatures to int
                    Object.keys(forecast.temp).map(function (key) {
                       forecast['temp'][key] =  parseInt(forecast['temp'][key]);
                    });

                    // adding date to forecast
                    forecast.weekDay    = moment.unix(forecast.dt).format('dddd');
                    forecast.dateStr    = moment.unix(forecast.dt).format('dddd, Do MMMM');

                    forecast.icon       = 'images/icons_weather/' + forecast.weather[0].icon + '.svg';
                    forecast.index      = index;
                    // ngClass purposes
                    forecast.className  = 'weather-forecast-day-' + index;

                    // uppercase weather description
                    forecast.weather[0].description = forecast.weather[0].description.replace(/\b[a-z]/g, function (f) { return f.toUpperCase(); });

                    $scope.forecast.push(forecast);
                });


            }, function (err) {
                // showing error toast
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(err.data.message ? err.data.message : 'Error getting weather!')
                        .position('top right')
                        .hideDelay(3000)
                );
            });
        }

        $scope.currentLocation  = 'Lisbon';
        $scope.getCurrentForecast();
    });
