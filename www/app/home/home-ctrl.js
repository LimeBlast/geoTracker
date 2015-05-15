(function () {
  'use strict';

  angular.module('geoTracker').controller('HomeCtrl', ['$ionicPlatform', '$cordovaDevice', '$cordovaGeolocation', HomeCtrl]);

  function HomeCtrl($ionicPlatform, $cordovaDevice, $cordovaGeolocation) {
    var vm = this;

    vm.example = 'This proves data binding works';

    $ionicPlatform.ready(function () {
      vm.device = $cordovaDevice.getDevice();


      var watchOptions = {
        maximumAge: 3600000,
        timeout: 3000,
        enableHighAccuracy: true
      };

      var watch = $cordovaGeolocation.watchPosition(watchOptions);
      watch.then(
        null,
        function (err) {
          vm.lat = 'Not working';
          vm.long = 'see console.log';
          console.log(err);
        },
        function (position) {
          vm.lat = position.coords.latitude;
          vm.long = position.coords.longitude;
        });

    });


  }
})();
