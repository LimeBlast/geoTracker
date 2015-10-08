(function () {
  'use strict';

  angular.module('geoTracker').controller('HomeCtrl', ['$ionicPlatform', '$cordovaGeolocation', '$ionicLoading', 'uiGmapGoogleMapApi', 'Coords', HomeCtrl]);

  function HomeCtrl($ionicPlatform, $cordovaGeolocation, $ionicLoading, uiGmapGoogleMapApi, Coords) {
    var vm = this;

    vm.coords = Coords;
    vm.session = Math.random().toString(36).substr(2, 5);
    vm.count = 0;
    vm.latLng = {latitude: 51.4768500, longitude: -0.0005290};

    vm.map = {
      center: vm.latLng,
      markers: [
        //{
        //  id: 1,
        //  latitude: 45,
        //  longitude: -74,
        //  showWindow: false,
        //  options: {
        //    animation: 1,
        //    labelContent: 'Markers id 1',
        //    labelAnchor: "22 0",
        //    labelClass: "marker-labels"
        //  }
        //},
        //{
        //  id: 2,
        //  latitude: 15,
        //  longitude: 30,
        //  showWindow: false,
        //},
        //{
        //  id: 3,
        //  icon: 'assets/images/plane.png',
        //  latitude: 37,
        //  longitude: -122,
        //  showWindow: false,
        //  title: 'Plane',
        //  options: {
        //    labelContent: 'Markers id 3',
        //    labelAnchor: "26 0",
        //    labelClass: "marker-labels"
        //  }
        //}
      ],
      zoom: 16
    };

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
        vm.latLng.latitude = position.coords.latitude;
        vm.latLng.longitude = position.coords.longitude;
        vm.map.markers.push({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          title: 'Your location',
          id: vm.session
        });
        vm.accuracy = position.coords.accuracy;
        vm.timestamp = position.timestamp;
        vm.count += 1;

        vm.coords.$add({
          latLng: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
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
