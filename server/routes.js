// weather forecast routes
var request = require('request');

// TODO put this to env vars
var API_URL = "http://api.openweathermap.org/data/2.5/";
var API_KEY = "2911ba8cd195c0f95bd59a86e338c71e";

module.exports = function(app)
{
    app.get('/api/weather', function (req, res) {
        var q   = req.query;
        q.appid = API_KEY;

        request.get({
            url: API_URL + 'weather',
            qs: q
        }).pipe(res);
    });

    app.get('/api/forecast', function (req, res) {
        var q   = req.query;
        q.appid = API_KEY;

        request.get({
            url: API_URL + 'forecast/daily',
            qs: q
        }).pipe(res);
    });
}
