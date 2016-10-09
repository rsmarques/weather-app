"use strict";angular.module("weatherApp",["weatherApp.services","ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngMaterial"]).constant("WEATHER_API_URL","http://api.openweathermap.org/data/2.5/").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/weather.html",controller:"WeatherCtrl",controllerAs:"weather"}).otherwise({redirectTo:"/"})}]),angular.module("weatherApp").controller("WeatherCtrl",["$scope","Weather",function(a,b){a.increaseForecastIndex=function(){return a.forecastIndex<a.forecast.length-1&&a.forecastIndex++,!0},a.decreaseForecastIndex=function(){return a.forecastIndex>0&&a.forecastIndex--,!0},a.setForecastIndex=function(b){return a.forecastIndex=b,!0},a.getCurrentForecast=function(){b.getForecastByString({appid:"2911ba8cd195c0f95bd59a86e338c71e",units:"metric",q:"Lisbon",cnt:5},function(b){a.locationStr=b.city.name+", "+b.city.country,a.forecast=[],a.forecastIndex=0,angular.forEach(b.list,function(b,c){Object.keys(b.temp).map(function(a){b.temp[a]=parseInt(b.temp[a])}),b.weekDay=moment.unix(b.dt).format("dddd"),b.dateStr=moment.unix(b.dt).format("dddd, Do MMMM"),b.icon="images/icons_weather/"+b.weather[0].icon+".svg",b.index=c,b.className="weather-forecast-day-"+c,b.weather[0].description=b.weather[0].description.replace(/\b[a-z]/g,function(a){return a.toUpperCase()}),a.forecast.push(b)})},function(a){console.log("Error getting weather!"),console.log(a)})},a.getCurrentForecast()}]),angular.module("weatherApp.services",["ngResource"]).factory("Weather",["$resource","WEATHER_API_URL",function(a,b){return a(b,{},{getCurrentWeatherByString:{url:b+"weather",method:"GET",params:{q:"@q",units:"@units",appid:"@appid"}},getForecastByString:{url:b+"forecast/daily",method:"GET",params:{q:"@q",units:"@units",appid:"@appid",cnt:"@cnt"}}})}]),angular.module("weatherApp").run(["$templateCache",function(a){a.put("views/weather.html",'<div layout="column" ng-class="forecast[forecastIndex].className" flex> <div ng-cloak class="weather-area demo-swipe" layout="column" layout-align="center center" md-swipe-left="increaseForecastIndex()" md-swipe-right="decreaseForecastIndex()"> <div layout="row"> <img class="weather-icon" ng-src="{{ forecast[forecastIndex].icon }}" class="md-card-image"> <md-list-item class="md-3-line"> <div ng-cloak layout="column" class="md-list-item-text" layout-align="center start"> <h2>{{ locationStr }}</h2> <h3>{{ forecast[forecastIndex].dateStr }}</h3> <p>{{ forecast[forecastIndex].weather[0].description }}</p> </div> </md-list-item> </div> <h1>{{ forecast[forecastIndex].temp.day + \'º\' }}</h1> <div layout="row" class="stats-row" layout-align="center center"> <div flex="33" layout="column" layout-align="center center"> <img class="stats-icon" ng-src="images/icons_weather/humidity.svg" class="md-card-image"> <h4>{{ forecast[forecastIndex].humidity + \' %\' }}</h4> </div> <p class="stats-divider">|</p> <div flex="33" layout="column" layout-align="center center"> <img class="stats-icon" ng-src="images/icons_weather/thermometer.svg" class="md-card-image"> <h4>{{ forecast[forecastIndex].temp.min + \'º\' }} - {{ forecast[forecastIndex].temp.max + \'º\' }}</h4> </div> <p class="stats-divider">|</p> <div flex="33" layout="column" layout-align="center center"> <img class="stats-icon" ng-src="images/icons_weather/wind.svg" class="md-card-image"> <h4>{{ forecast[forecastIndex].speed + \' m/s\' }}</h4> </div> </div> </div> </div> <div ng-cloak layout="column" layout-align="center center"> <div layout="row" class="weather-forecast" layout-align="center center"> <md-list-item ng-class="f.className" ng-click="setForecastIndex(f.index)" ng-repeat="f in forecast | limitTo : 4 : 1" flex="25"> <div layout="column" class="md-list-item-text weather-forecast-column" layout-align="center center"> <h6>{{ f.weekDay}}</h6> <img class="stats-icon" ng-src="{{ f.icon }}" class="md-card-image"> <h6>{{ f.temp.max + \'º\'}}</h6> </div> </md-list-item> </div> </div>')}]);