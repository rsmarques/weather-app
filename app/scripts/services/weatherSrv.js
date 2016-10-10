angular.module('weatherApp.services', ['ngResource'])

    .factory('Weather', function ($resource, API_URL) {
        return $resource(API_URL, {}, {
            getWeather: {
                url: API_URL + 'weather',
                method: 'GET',
                params: {
                    q: '@q',
                    lat : '@lat',
                    lon : '@lon',
                    units: '@units',
                    cnt: '@cnt',
                }
            },

            getForecast: {
                url: API_URL + 'forecast',
                method: 'GET',
                params: {
                    q: '@q',
                    lat : '@lat',
                    lon : '@lon',
                    units: '@units',
                    cnt: '@cnt',
                }
            },
        });
    });
