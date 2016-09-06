'use strict';
var managementApp = angular.module('managementApp');

managementApp.controller('adminController', ['$scope', '$http', '$state', '$location', 'logger', 'userFunctions',

  function($scope, $http, $state, $location, logger, userFunctions) {
    logger.info('admin controller');

    $http.get('./data/companies.json').success(function(data) {
      $scope.companies = data;
    });

    $scope.addCompany = function() {
      $scope.companies.push({
        id: $scope.companies.length + 1,
        name: $scope.newcompany.name,
        available: true
      });

      $scope.newcompany.name = '';
    };

    var editMode;
    $scope.normalMode = true;
    var nameOfEditedCompany = '';

    $scope.editing = function(company) {
      $scope.editMode = true;
      $scope.normalMode = false;
    };

    $scope.save = function(company) {
      $scope.editedCompany = $scope.companies.indexOf(company);
      $scope.nameOfEditedCompany = $scope.companies[editedCompany].name;
      $scope.editMode = false;
      $scope.normalMode = true;
    };

    $scope.cancel = function(company) {
      $scope.company.name = nameOfEditedCompany;
      $scope.editMode = false;
      $scope.normalMode = true;
    };

    $scope.removeCompany = function(company) {
      var removedCompany = $scope.companies.indexOf(company);
      $scope.companies[removedCompany].available = false;
    };

    $scope.undoRemoveCompany = function(company) {
      // var removedCompany = $scope.companies.indexOf(company);
      // $scope.companies[removedCompany].available = true;
      return;
    };

    $scope.logOut = function() {
      userFunctions.logOut();
    };
  }]);
