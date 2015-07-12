angular.module('starter').controller('MapController',
  [ '$scope',
    '$cordovaGeolocation',
    '$location',
    '$state',
    '$log',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    'LocationsService',
    'InstructionsService',
    function(
      $scope,
      $cordovaGeolocation,
      $location,
      $state,
      $log,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      LocationsService,
      InstructionsService
      ) {

      $scope.$on("$stateChangeSuccess", function() {

        $scope.locations = LocationsService.savedLocations;
        $scope.newLocation;

        if(!InstructionsService.instructions.newLocations.seen) {

          var instructionsPopup = $ionicPopup.alert({
            title: 'Add Locations',
            template: InstructionsService.instructions.newLocations.text
          });
          instructionsPopup.then(function(res) {
            InstructionsService.instructions.newLocations.seen = true;
            });

        }

        $scope.map = {
          defaults: {
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'bottomleft'
          },
          markers : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
        };

        if(LocationsService.savedLocations.length > 0){
          $scope.goToLastMarker();
        }else{
          $scope.goToInit();
          $scope.locate();
        }
        /*for (var i=0; i<LocationsService.savedLocations.length; i++) {
          $scope.goTo(i);
        } */
        
        

      });

      var Location = function() {
        if ( !(this instanceof Location) ) return new Location();
        this.lat  = "";
        this.lng  = "";
        this.name = "";
      };

      $ionicModal.fromTemplateUrl('templates/addLocation.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
        });

      /**
       * Detect user long-pressing on map to add new location
       */
      $scope.$on('leafletDirectiveMap.contextmenu', function(event, locationEvent){
        $scope.newLocation = new Location();
        $scope.newLocation.lat = locationEvent.leafletEvent.latlng.lat;
        $scope.newLocation.lng = locationEvent.leafletEvent.latlng.lng;
        $scope.modal.show();
      });

      $scope.saveLocation = function() {
        LocationsService.savedLocations.push($scope.newLocation);
        $scope.modal.hide();
        $location.path('/app/form');
        //$scope.goTo(LocationsService.savedLocations.length - 1);
      };

      $scope.data = {
        _id: "",
        interviewer : {
          name: "",
          tlf: "",
          direccion: "",
          email: "",
          cargo: ""
        },
        organization : {
          name: "asasd",
          lineActivity: "",
          rangeList: "",
          timeOfWork: ""
        },
         hitos : {
          howIsPeople: "",
          otherActivityNomal: "",
          activityNomal: "",
          needTics: "",
          otherNeedTics: ""
        }
      }
      

      $scope.cacheOfflineTiles = function() {
        console.log("click boton save")
      if (navigator.onLine) {
        // get the map extent
        var mapViewExtent = getMapViewExtent();

        // set the extent into the ViewExtentFactory
        ViewExtentFactory.setExtent(getCurrentVisibleLayer(), mapViewExtent.topRight, mapViewExtent.bottomLeft, mapViewExtent.zoom);

        // we set the current map provider so if we ever come back, we should try to use that map provider instead of the default provider
        OfflineTilesFactory.setCurrentMapProvider(getCurrentVisibleLayer());

        $location.path("/app/map/archiveTiles");
      } else
        $ionicPopup.alert({
          title: 'Offline!',
          template: 'You must be online to save a map!'
        });
    };

    $scope.save = function() {
        OfflineLayer = require('./OfflineLayer')
        //$scope.goTo(LocationsService.savedLocations.length - 1);
      };

    var getMapViewExtent = function() {
      var extent = $scope.map.getView().calculateExtent($scope.map.getSize());
      var zoom = $scope.map.getView().getZoom();
      var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent),
        'EPSG:3857', 'EPSG:4326');
      var topRight = ol.proj.transform(ol.extent.getTopRight(extent),
        'EPSG:3857', 'EPSG:4326');

      return {
        topRight: new Point(topRight[1], topRight[0]),
        bottomLeft: new Point(bottomLeft[1], bottomLeft[0]),
        zoom: zoom
      };
    };
      

      /**
       * Center map on specific saved location
       * @param locationKey
       */
      $scope.goTo = function(locationKey) {

        var location = LocationsService.savedLocations[locationKey];
        $scope.map.center  = {
              lat : location.lat,
              lng : location.lng,
              zoom : 18
            };
            $scope.map.markers[locationKey] = {
              lat:location.lat,
              lng:location.lng,
              message: location.name,
              focus: true,
              draggable: false
            };

        

      };

      $scope.goToLastMarker = function(){
        $scope.goTo(LocationsService.savedLocations.length - 1);
      }

      $scope.goToInit = function() {

        $scope.map.center  = {
              lat : -0.180653,
              lng : -78.467838,
              zoom : 12
            };

        

      };

      /**
       * Center map on user's current position
       */
      $scope.locate = function(){

        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
            $scope.map.center.lat  = position.coords.latitude;
            $scope.map.center.lng = position.coords.longitude;
            $scope.map.center.zoom = 18;

            $scope.map.markers.now = {
              lat:position.coords.latitude,
              lng:position.coords.longitude,
              message: "You Are Here",
              focus: true,
              draggable: false
            };

          }, function(err) {
            // error
            console.log("Location error!");
            console.log(err);
          });

      };

    }]);