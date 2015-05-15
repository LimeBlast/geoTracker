angular.module('geoTracker', ['ionic', 'ngCordova', 'templates'])

  .run(['$ionicPlatform', function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  }])

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('home', {
        url: '/home',
        templateUrl: 'home/home.html'
      });

    $urlRouterProvider.otherwise('/home');

  }]);

(function () {
  'use strict';

  angular.module('geoTracker').controller('HomeCtrl', ['$ionicPlatform', '$cordovaDevice', '$cordovaGeolocation', HomeCtrl]);

  function HomeCtrl($ionicPlatform, $cordovaDevice, $cordovaGeolocation) {
    var vm = this;

    vm.example = 'This proves data binding works';

    $ionicPlatform.ready(function () {
      vm.device = $cordovaDevice.getDevice();


      var watchOptions = {
        maximumAge: 3000,
        timeout: 3000,
        enableHighAccuracy: true
      };

      var watch = $cordovaGeolocation.watchPosition(watchOptions);
      watch.then(
        null,
        function (err) {
          // error
        },
        function (position) {
          vm.lat = position.coords.latitude;
          vm.long = position.coords.longitude;
        });

    });


  }
})();

angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("home/home.html","<ion-view view-title=\"geoTracker\" ng-controller=\"HomeCtrl as vm\">\n  <ion-content>\n    <div class=\"card\">\n      <div class=\"item item-divider\">A Lime Blast Experiment</div>\n      <div class=\"item item-body\">\n        The purpose of this experiment is to test the plausibility of using Cordova to power a geolocation base capture\n        game.\n      </div>\n      <div class=\"item item-body\">\n        {{vm.example}}\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"item item-divider\">Device</div>\n      <div class=\"item\">\n        <div class=\"row\">\n          <div class=\"col\">\n            <h2>Model</h2>\n\n            <p>{{vm.device.model}}</p>\n          </div>\n          <div class=\"col\">\n            <h2>Version</h2>\n\n            <p>{{vm.device.version}}</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"item item-divider\">Geolocation</div>\n      <div class=\"item\">\n        <div class=\"row\">\n          <div class=\"col\">\n            <h2>Latitude</h2>\n\n            <p>{{vm.lat}}</p>\n          </div>\n          <div class=\"col\">\n            <h2>Longitude</h2>\n\n            <p>{{vm.long}}</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");}]);