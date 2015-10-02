(function () {
  'use strict';

  angular.module('geoTracker').controller('HomeCtrl', ['$ionicPlatform', '$cordovaGeolocation', HomeCtrl]);

  function HomeCtrl($ionicPlatform, $cordovaGeolocation) {
    var vm = this;

    vm.example = 'This proves data binding works';
    vm.count = 0;

    vm.startWatchPosition = function () {
      var onSuccess = function (position) {
        vm.coords = true;
        vm.latitude = position.coords.latitude;
        vm.longitude = position.coords.longitude;
        vm.accuracy = position.coords.accuracy;
        vm.timestamp = position.timestamp;
        vm.count += 1;
      };

      vm.watch = $cordovaGeolocation
        .watchPosition({
          enableHighAccuracy: true
        });

      vm.watch.then(
        null,
        onError,
        onSuccess
      );
    };

    vm.endWatchPosition = function () {
      vm.watch.clearWatch();
    };

    vm.updateWatchPosition = function () {
      if (vm.watchPosition) {
        vm.startWatchPosition();
      } else {
        vm.endWatchPosition();
      }
    };

    $ionicPlatform.ready(function () {
      //vm.startWatchPosition();
    });

    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

  }
})();
