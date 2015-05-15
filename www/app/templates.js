angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("home/home.html","<ion-view view-title=\"geoTracker\" ng-controller=\"HomeCtrl as vm\">\n  <ion-content>\n    <div class=\"card\">\n      <div class=\"item item-divider\">A Lime Blast Experiment</div>\n      <div class=\"item item-body\">\n        The purpose of this experiment is to test the plausibility of using Cordova to power a geolocation base capture\n        game.\n      </div>\n      <div class=\"item item-body\">\n        {{vm.example}}\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"item item-divider\">Device</div>\n      <div class=\"item\">\n        <div class=\"row\">\n          <div class=\"col\">\n            <h2>Model</h2>\n\n            <p>{{vm.device.model}}</p>\n          </div>\n          <div class=\"col\">\n            <h2>Version</h2>\n\n            <p>{{vm.device.version}}</p>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"item item-divider\">Geolocation</div>\n      <div class=\"item\">\n        <div class=\"row\">\n          <div class=\"col\">\n            <h2>Latitude</h2>\n\n            <p>{{vm.lat}}</p>\n          </div>\n          <div class=\"col\">\n            <h2>Longitude</h2>\n\n            <p>{{vm.long}}</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");}]);