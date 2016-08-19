'use strict';
var managementApp = angular.module('managementApp', ['ui.router']);

managementApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'partial-home.html',
      controller: 'homeController'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'partial-login.html',
      controller: 'loginController'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'partial-register.html',
      controller: 'registerController'
    })

    .state('your', {
      url: '/your',
      controller: 'yourController',
      templateUrl: 'partial-your.html'
    });
});

managementApp.controller('homeController', ['$scope', '$http', 'logger', function($scope, $http, logger) {
  logger.info('home controller');
}]);

managementApp.controller('yourController', ['$scope', '$http', 'logger', function($scope, $http, logger) {
  logger.info('your controller');

  $scope.showYourData = function(yourData) {
    $scope.yourFirstname = yourData[0].firstname;
    $scope.yourLastname = yourData[0].lastname;
    $scope.yourEmail = yourData[0].email;
    $scope.yourGithub = yourData[0].github;
  };

  $http.get(yourUrl + '/your/' + yourUser).success(function(yourData) {
    logger.info('yourController http get');
    $scope.showYourData(yourData);
  });

  $scope.modifyYourData = function(target) {
    window.alert('Modify: ' + target);
    console.log(target);
  };
}]);

managementApp.controller('registerController', ['$scope', '$http', '$state', '$location', 'logger', function($scope, $http, $state, $location, logger) {
  logger.info('register controller');

  function getUrl() {
    return ($location.absUrl().split('/#/')[0]);
  }

  function clearInputFields() {
    $scope.newMember.email = '';
    $scope.newMember.password = '';
    $scope.newMember.confirmPassword = '';
  }

  function newMemberMaker() {
    return { email: $scope.newMember.email, password: $scope.newMember.password };
  }

  $scope.submitRegister = function() {
    if ($scope.newMember.password === $scope.newMember.confirmPassword) {
      $http.post(getUrl() + '/api/register', newMemberMaker())
        .then(function successCallback(response) {
          $state.go('your');
        }, function errorCallback(response) {
          $scope.errorMsg = 'Registration error: e-mail address already exist';
        });
    } else {
      $scope.errorMsg = 'Registration error: confirmed password does not match original';
    }
    clearInputFields();
  };
}]);

managementApp.controller('loginController', ['$scope', '$http', '$state', '$location', 'logger', function($scope, $http, $state, $location, logger) {
  logger.info('login controller');

  function getUrl() {
    return ($location.absUrl().split('/#/')[0]);
  }

  function clearInputFields() {
    $scope.loggedinMember.email = '';
    $scope.loggedinMember.password = '';
    $scope.errorMsg = '';
  }

  function memberLogin() {
    return { email: $scope.loggedinMember.email, password: $scope.loggedinMember.password };
  }

  $scope.submitLogin = function() {
    $http.post(getUrl() + '/api/login', memberLogin())
      .then(function successCallback(response) {
        $state.go('your');
      }, function errorCallback(response) {
        $scope.errorMsg = 'Login error: e-mail and password do not match';
      });
    clearInputFields();
  };
}]);
