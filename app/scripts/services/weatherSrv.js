angular.module('weatherApp.services', ['ngResource'])

    .factory('Weather', function ($resource, WEATHER_API_URL) {
        return $resource(WEATHER_API_URL, {}, {

            getWeather: {
                url: WEATHER_API_URL + 'weather',
                method: 'GET',
                params: {
                    q: '@q',
                    units: '@units',
                    appid: '@appid',
                }
            },

            getForecast: {
                url: '/api/forecast',
                method: 'GET',
                params: {
                    q: '@q',
                    lat : '@lat',
                    lon : '@lon',
                    units: '@units',
                    appid: '@appid',
                    cnt: '@cnt',
                }
            },
        });
    });
