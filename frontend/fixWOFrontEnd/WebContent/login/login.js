'use strict';

angular.module('fixWO.login', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}])
 
// Login controller
.controller('LoginCtrl', [function() {
 
}]);