angular.module('starter').controller('InfoController',
  [ '$scope',
    '$state',
    '$log',
    '$stateParams',
    'LocationsService',
    'pouchCollection',
    'OrganitationService',
    'InterviewerService',
    'HitosService',
    'GeneralService',
    function(
      $scope,
      $state,
      $log,
      $stateParams,
      LocationsService,
      pouchCollection,
      OrganitationService,
      InterviewerService,
      HitosService,
      GeneralService
      ) {

      var localDB = new PouchDB('mylocaldb', {adapter: 'websql'})
      var remoteDB = new PouchDB('http://localhost:5984/myremotedb')
      $scope.sync = localDB.replicate.sync(remoteDB, {live: true})
          .on('error', function (err) {
            console.log("Syncing stopped");
            console.log(err);
          });
      /**
       * Once state loaded, get put map on scope.
       */
      //$scope.tasks = pouchCollection(dbName);
      //$scope.data = pouchCollection(dbName);
      //$scope.tasks.$add({title: "as", completed: false});
      var Organitation = function() {
        if ( !(this instanceof Organitation) ) return new Organitation();
        this.name  = "";
        this.lineActivity  = "";
        this.rangeList  = "";
        this.timeOfWork  = "";
      };
      var Interviewer = function() {
        if ( !(this instanceof Interviewer) ) return new Interviewer();
        this.name  = "";
        this.tlf  = "";
        this.direccion  = "";
        this.email  = "";
        this.cargo  = "";
      };
      var Hitos = function() {
        if ( !(this instanceof Hitos) ) return new Hitos();
        this.howIsPeople  = "";
        this.otherActivityNomal  = "";
        this.activityNomal  = "";
        this.needTics  = "";
        this.otherNeedTics  = "";
      };

      $scope.newOrganitation = new Organitation();
      $scope.newInterviewer = new Interviewer();
      $scope.newHitos = new Hitos();

      $scope.step1 = function() {
        console.log("los datos de Interviewer son : " + $scope.newInterviewer.name)
        InterviewerService.savedLocations.push($scope.newInterviewer);
        $state.go('app.form2');
        //$scope.goTo(LocationsService.savedLocations.length - 1);
        //$scope.goTo(LocationsService.savedLocations.length - 1);
      };

      $scope.step2 = function() {
        OrganitationService.savedLocations.push($scope.newOrganitation);
        $state.go('app.form3');
        //$scope.goTo(LocationsService.savedLocations.length - 1);
        //$scope.goTo(LocationsService.savedLocations.length - 1);
      };

      $scope.step3 = function() {
        //$scope.data.$add({title: "as", completed: false});
        var interviewer = InterviewerService.savedLocations[InterviewerService.savedLocations.length - 1];
        var organization = OrganitationService.savedLocations[OrganitationService.savedLocations.length - 1];
        var doc = {
        "_id": new Date().getTime() + '',
        "interviewer" : {
          "name": interviewer.name,
          "tlf": interviewer.tlf,
          "direccion": interviewer.direccion,
          "email": interviewer.email,
          "cargo": interviewer.cargo
        },
        "organization" : {
          "name": organization.name,
          "lineActivity": organization.lineActivity,
          "rangeList": organization.rangeList,
          "timeOfWork": organization.timeOfWork
        },
         "hitos" : {
          "howIsPeople": $scope.newHitos.howIsPeople,
          "otherActivityNomal": $scope.newHitos.otherActivityNomal,
          "activityNomal": $scope.newHitos.activityNomal,
          "needTics": $scope.newHitos.needTics,
          "otherNeedTics": $scope.newHitos.otherNeedTics
        }
      }

        GeneralService.savedLocations.push(doc);
        localDB.post(doc)
        $state.go('app.map');
        //$scope.goTo(LocationsService.savedLocations.length - 1);
        //$scope.goTo(LocationsService.savedLocations.length - 1);
      };

    }]);