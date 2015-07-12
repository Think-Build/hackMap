// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'leaflet-directive', 'ngCordova', 'igTruncate', 'pouchdb'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        window.cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'MapController'
      })

      .state('app.map', {
        url: "/map",
        views: {
          'menuContent' :{
            templateUrl: "templates/map.html"
          }
        }
      })

      .state('app.form', {
        url: "/form",
        views: {
          'menuContent' :{
            templateUrl: "templates/form.html",
            controller: 'InfoController'
          }
        }
      })

      .state('app.form2', {
        url: "/form2",
        views: {
          'menuContent' :{
            templateUrl: "templates/form2.html",
            controller: 'InfoController'
          }
        }
      })

      .state('app.form3', {
        url: "/form3",
        views: {
          'menuContent' :{
            templateUrl: "templates/form3.html",
            controller: 'InfoController'
          }
        }
      })

      .state('app.archiveTiles', {
        url: "/map/archiveTiles",
        views: {
          'menuContent': {
            templateUrl: "templates/archiveTiles.html",
            controller: 'ArchiveTilesCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/app/map');

  });