'use strict';

/**
 * @ngdoc function
 * @name weatherApp.controller:WeatherCtrl
 * @description
 * # WeatherCtrl
 * Controller of the weatherApp
 */
angular.module('weatherApp')

    .controller('WeatherCtrl', function ($scope, $geolocation, $mdDialog, $mdToast, Weather) {

        $scope.init  = function ()
        {
            $geolocation.getCurrentPosition({
                timeout: 60000
            }).then(function (position) {
                $scope.currentLocation = { type : 'geolocation', args: {'lat' : position.coords.latitude, 'lon' : position.coords.longitude }};
                $scope.getCurrentForecast();
            }, function (err) {
                // error fetching location
                $scope.showLocationPrompt();
            });
        }

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
                $scope.currentLocation = { type : 'string', args : {'q' : result }};
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
            if (!$scope.currentLocation.args) {
                // no location to search for
                return false;
            }

            var args    = { appid: '2911ba8cd195c0f95bd59a86e338c71e', units: 'metric', cnt: 5 };
            for (var key in $scope.currentLocation.args) { args[key] = $scope.currentLocation.args[key]; }

            Weather.getForecast(args, function (result) {

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
                        .textContent(err.data && err.data.message ? err.data.message : 'Error getting weather!')
                        .position('top right')
                        .hideDelay(3000)
                );
            });
        }

        $scope.init();
    });
