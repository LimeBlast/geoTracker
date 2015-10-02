(function () {
  'use strict';

  angular.module('geoTracker').controller('HomeCtrl', ['$ionicPlatform', '$cordovaGeolocation', '$ionicLoading', '$firebaseArray', HomeCtrl]);

  function HomeCtrl($ionicPlatform, $cordovaGeolocation, $ionicLoading, $firebaseArray) {
    var vm = this;

    var firebaseObj = new Firebase("https://limeblast-geotracker.firebaseio.com/Coords");
    var fb = $firebaseArray(firebaseObj);

    vm.example = 'This proves data binding works';
    vm.count = 0;

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

        fb.$add({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
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
