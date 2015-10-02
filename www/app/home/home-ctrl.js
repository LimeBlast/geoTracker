(function () {
  'use strict';

  angular.module('geoTracker').controller('HomeCtrl', ['$ionicPlatform', '$cordovaDevice', '$cordovaGeolocation', HomeCtrl]);

  function HomeCtrl($ionicPlatform, $cordovaDevice, $cordovaGeolocation) {
    var vm = this;

    vm.example = 'This proves data binding works';

    $ionicPlatform.ready(function () {
      vm.device = $cordovaDevice.getDevice();

      var geoOptions = {
        maximumAge: 5 * 60 * 1000,
        timeout: 60 * 1000,
        enableHighAccuracy: false
      };

      $cordovaGeolocation
        .getCurrentPosition(geoOptions)
        .then(function (position) {
          vm.lat = position.coords.latitude;
          vm.long = position.coords.longitude;
          vm.command = 'getCurrentPosition';

          var watch = $cordovaGeolocation.watchPosition(geoOptions);

          watch.clearWatch();
          watch.then(
            null,
            function (err) {
              vm.lat = 'Watch failed';
              vm.long = 'see console.log';
              console.log('Error w/ watchPosition: ' + JSON.stringify(err));
            },
            function (position) {
              vm.lat = position.coords.latitude;
              vm.long = position.coords.longitude;
              vm.command = 'watchPosition';
            });

        }, function (err) {
          vm.lat = 'Get failed';
          vm.long = 'see console.log';
          console.log('Error w/ getCurrentPosition: ' + JSON.stringify(err));
        });

    });

  }
})();
