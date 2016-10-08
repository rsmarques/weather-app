angular.module('weatherApp.services', ['ngResource'])

    .factory('Weather', function ($resource, WEATHER_API_URL) {
        return $resource(WEATHER_API_URL, {}, {

            getCurrentWeatherByString: {
                url: WEATHER_API_URL + 'weather',
                method: 'GET',
                params: {
                    q: '@q',
                    units: '@units',
                    appid: '@appid',
                }
            },

            getForecastByString: {
                url: WEATHER_API_URL + 'forecast/daily',
                method: 'GET',
                params: {
                    q: '@q',
                    units: '@units',
                    appid: '@appid',
                }
            },
        });
    });
