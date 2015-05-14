(function () {
  'use strict';

  angular.module('geoTracker').controller('HomeCtrl', ['$ionicPlatform', '$cordovaDevice', HomeCtrl]);

  function HomeCtrl($ionicPlatform, $cordovaDevice) {
    var vm = this;

    vm.example = 'This proves data binding works';

    $ionicPlatform.ready(function () {
      //vm.device = $cordovaDevice.getDevice();
    });


  }
})();
