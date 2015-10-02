(function () {
  'use strict';

  angular.module('geoTracker').controller('HomeCtrl', ['$ionicPlatform', '$cordovaDevice', '$cordovaGeolocation', HomeCtrl]);

  function HomeCtrl($ionicPlatform, $cordovaDevice, $cordovaGeolocation) {
    var vm = this;

    $ionicPlatform.ready(function () {
      vm.example = 'This proves data binding works';
      vm.count = 0;

      vm.device = $cordovaDevice.getDevice();

      var geoOptions = {
        maximumAge: 5 * 60 * 1000,
        timeout: 60 * 1000,
        enableHighAccuracy: false
      };

      $cordovaGeolocation
        .getCurrentPosition(geoOptions)
        .then(
        updatePosition,
        onError
      );

      $cordovaGeolocation.watchPosition(geoOptions)
        .then(
        null,
        onError,
        updatePosition
      );

      function updatePosition(position) {
        vm.lat = position.coords.latitude;
        vm.long = position.coords.longitude;
        vm.count = +1;
        vm.info = new Date();
      }

      function onError(error) {
        vm.error = JSON.stringify(error);
      }

    });

  }
})();
