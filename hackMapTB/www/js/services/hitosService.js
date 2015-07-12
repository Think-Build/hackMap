angular.module('starter').factory('HitosService', [ function() {

 
  var infoHitos = {};

  infoHitos.savedLocations = [];


  return infoHitos;

}]);