(function () {
  'use strict';

  angular.module('geoTracker').controller('HomeCtrl', ['$ionicPlatform', '$cordovaGeolocation', '$ionicLoading', 'uiGmapGoogleMapApi', 'Coords', HomeCtrl]);

  function HomeCtrl($ionicPlatform, $cordovaGeolocation, $ionicLoading, uiGmapGoogleMapApi, Coords) {
    var vm = this;

    vm.coords = Coords;
    vm.session = Math.random().toString(36).substr(2, 5);
    vm.count = 0;

    vm.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    vm.startWatchPosition = function () {

      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });

      var onSuccess = function (position) {
        vm.showCoords = true;
        vm.latitude = position.coords.latitude;
        vm.longitude = position.coords.longitude;
        vm.accuracy = position.coords.accuracy;
        vm.timestamp = position.timestamp;
        vm.count += 1;

        vm.coords.$add({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
          session: vm.session
        }).then(function (ref) {
          console.log(ref);
        }, onError);

        $ionicLoading.hide();
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
