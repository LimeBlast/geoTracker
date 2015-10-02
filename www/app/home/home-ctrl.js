(function () {
  'use strict';

  angular.module('geoTracker').controller('HomeCtrl', ['$ionicPlatform', '$cordovaDevice', '$cordovaGeolocation', HomeCtrl]);

  function HomeCtrl($ionicPlatform, $cordovaDevice, $cordovaGeolocation) {
    var vm = this;

    vm.example = 'This proves data binding works';
    vm.count = 0;

    vm.findGeolocation = function () {
      console.log("navigator.geolocation works");

      var onSuccess = function (position) {
        vm.coords = true;
        vm.latitude = position.coords.latitude;
        vm.longitude = position.coords.longitude;
        vm.accuracy = position.coords.accuracy;
        vm.timestamp = position.timestamp;
        vm.count += 1;
      };

      $cordovaGeolocation
        .getCurrentPosition({
          enableHighAccuracy: true
        }).then(
        onSuccess,
        onError
      );
    };

    $ionicPlatform.ready(function () {
      vm.device = $cordovaDevice.getDevice();
      //vm.findGeolocation();
    });

    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

  }
})();
