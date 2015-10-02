(function () {
  'use strict';

  angular.module('geoTracker').factory('Coords', ['$firebaseArray', function ($firebaseArray) {
    var coordsRef = new Firebase("https://limeblast-geotracker.firebaseio.com/coords");
    return $firebaseArray(coordsRef);
  }]);
})();
