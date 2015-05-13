(function () {
  'use strict';

  angular.module('geoTracker').controller('HomeCtrl', [HomeCtrl]);

  function HomeCtrl() {
    var vm = this;

    vm.example = 'This proves data binding works';
  }
})();
